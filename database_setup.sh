#!/bin/bash

# Simple database setup script that creates database and tables if they don't exist

# Database configuration
DB_NAME="openshelf"
DB_USER="postgres"
DB_PASSWORD="postgres"
DB_HOST="localhost"
DB_PORT="5432"

echo "Starting OpenShelf Database Setup (Safe Mode)..."

# Check if PostgreSQL is running
export PGPASSWORD=$DB_PASSWORD
if ! pg_isready -h $DB_HOST -p $DB_PORT >/dev/null 2>&1; then
    echo "Error: PostgreSQL is not running on $DB_HOST:$DB_PORT"
    echo "Please start PostgreSQL service and try again."
    exit 1
fi

# Create database if it doesn't exist
echo "Creating database '$DB_NAME' if it doesn't exist..."
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -c "CREATE DATABASE $DB_NAME;" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "Database '$DB_NAME' created successfully."
else
    echo "Database '$DB_NAME' already exists or creation failed. Continuing..."
fi

# Create tables (this will fail gracefully if tables already exist)
echo "Creating tables..."

PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME << EOF

-- Enable UUID extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone_num BIGINT,
    address TEXT,
    google_oauth_id VARCHAR(255),
    google_oauth_token TEXT
);

-- Create items table
CREATE TABLE IF NOT EXISTS items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    tags TEXT[],
    description TEXT,
    condition VARCHAR(50) NOT NULL CHECK (condition IN ('New', 'Used - Like New', 'Used')),
    image_urls TEXT[],
    number_of_items INTEGER DEFAULT 1 CHECK (number_of_items >= 0),
    is_available BOOLEAN DEFAULT TRUE
);

-- Create borrow_requests table
CREATE TABLE IF NOT EXISTS borrow_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_id UUID NOT NULL REFERENCES items(id) ON DELETE CASCADE,
    borrower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'returned')),
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    return_date TIMESTAMP,
    notes TEXT,
    decline_reason TEXT
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('request', 'reminder', 'status-update', 'return')),
    message TEXT NOT NULL,
    link VARCHAR(255),
    is_read BOOLEAN DEFAULT FALSE
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messaging (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL,
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read BOOLEAN DEFAULT FALSE
);

-- Create indexes for better performance (will be ignored if they exist)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_items_owner_id ON items(owner_id);
CREATE INDEX IF NOT EXISTS idx_items_category ON items(category);
CREATE INDEX IF NOT EXISTS idx_borrow_requests_item_id ON borrow_requests(item_id);
CREATE INDEX IF NOT EXISTS idx_borrow_requests_borrower_id ON borrow_requests(borrower_id);
CREATE INDEX IF NOT EXISTS idx_borrow_requests_owner_id ON borrow_requests(owner_id);
CREATE INDEX IF NOT EXISTS idx_borrow_requests_status ON borrow_requests(status);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_messaging_conversation_id ON messaging(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messaging_sender_id ON messaging(sender_id);
CREATE INDEX IF NOT EXISTS idx_messaging_receiver_id ON messaging(receiver_id);

EOF

if [ $? -eq 0 ]; then
    echo "Database setup completed successfully!"
else
    echo "Error: Failed to create tables"
    exit 1
fi

echo "Database Name: $DB_NAME"
echo "Tables created/verified:"
echo "  - users"
echo "  - items"
echo "  - borrow_requests"
echo "  - notifications"
echo "  - messaging"
echo ""
echo "You can now connect to your database using:"
echo "PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME"
