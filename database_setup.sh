#!/bin/bash

# Database configuration
DB_NAME="openshelf"
DB_USER="postgres" # modify based on your PostgreSQL setup
DB_PASSWORD="postgres" # modify based on your PostgreSQL setup
DB_HOST="localhost"
DB_PORT="5432"

echo "Starting OpenShelf Database Setup..."

# Check if PostgreSQL is running
export PGPASSWORD=$DB_PASSWORD
if ! pg_isready -h $DB_HOST -p $DB_PORT >/dev/null 2>&1; then
    echo "Error: PostgreSQL is not running on $DB_HOST:$DB_PORT"
    echo "Please start PostgreSQL service and try again."
    exit 1
fi

# Check if database exists
DB_EXISTS=$(PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -lqt | cut -d \| -f 1 | grep -w $DB_NAME)

if [ ! -z "$DB_EXISTS" ]; then
    echo "Database '$DB_NAME' already exists. Dropping it..."
    # Drop the database if it exists
    PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -c "DROP DATABASE IF EXISTS $DB_NAME;" 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "Database '$DB_NAME' dropped successfully."
    else
        echo "Error: Failed to drop database '$DB_NAME'"
        exit 1
    fi
fi

# Create the database
echo "Creating database '$DB_NAME'..."
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -c "CREATE DATABASE $DB_NAME;" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "Database '$DB_NAME' created successfully."
else
    echo "Error: Failed to create database '$DB_NAME'"
    exit 1
fi

# Create tables
echo "Creating tables..."

# SQL commands to create tables
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME << EOF

-- Enable UUID extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone_num BIGINT,
    address TEXT,
    google_oauth_id VARCHAR(255),
    google_oauth_token TEXT,
);

-- Create items table
CREATE TABLE items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    tags TEXT[], -- PostgreSQL array for tags
    description TEXT,
    condition VARCHAR(50) NOT NULL CHECK (condition IN ('New', 'Used - Like New', 'Used')),
    image_urls TEXT[], -- PostgreSQL array for image URLs
    number_of_items INTEGER DEFAULT 1 CHECK (number_of_items >= 0),
    is_available BOOLEAN DEFAULT TRUE,
);

-- Create borrow_requests table
CREATE TABLE borrow_requests (
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
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('request', 'reminder', 'status-update', 'return')),
    message TEXT NOT NULL,
    link VARCHAR(255),
    is_read BOOLEAN DEFAULT FALSE
);

-- Create messages table
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL,
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read BOOLEAN DEFAULT FALSE
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_items_owner_id ON items(owner_id);
CREATE INDEX idx_items_category ON items(category);
CREATE INDEX idx_borrow_requests_item_id ON borrow_requests(item_id);
CREATE INDEX idx_borrow_requests_borrower_id ON borrow_requests(borrower_id);
CREATE INDEX idx_borrow_requests_owner_id ON borrow_requests(owner_id);
CREATE INDEX idx_borrow_requests_status ON borrow_requests(status);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);

EOF

if [ $? -eq 0 ]; then
    echo "Tables created successfully!"
else
    echo "Error: Failed to create tables"
    exit 1
fi

echo "Database setup completed successfully!"
echo "Database Name: $DB_NAME"
echo "Tables created:"
echo "  - users"
echo "  - items"
echo "  - borrow_requests"
echo "  - notifications"
echo "  - messages"
echo ""
echo "You can now connect to your database using:"
echo "PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME"
