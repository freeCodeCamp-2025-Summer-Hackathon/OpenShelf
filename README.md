<div align="center">

# OpenShelf

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=flat-square&logo=django&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)

**A community-driven digital lending library for books, tools, and games.**

</div>

## Features

### Homepage & Navigation
- [ ] Display item categories (books, tools, games) with featured listings
- [ ] Search bar functionality for name, category, or keywords
- [ ] Guest browsing with prompts to log in for full access
- [ ] Responsive design for all device types

### Authentication
- [ ] User registration with email/password or Google OAuth
- [ ] Secure login system with session management
- [ ] Account confirmation and verification process
- [ ] Password reset functionality

### Browse & Search
- [ ] Advanced filtering by category, availability, and location
- [ ] Real-time search with keyword matching
- [ ] Item cards displaying title, image, and availability status
- [ ] Pagination for large result sets

### Item Management
- [ ] Detailed item view with description, condition, and owner info
- [ ] Add new items with photos, descriptions, and categories
- [ ] Edit and update existing item listings
- [ ] Set item availability and lending terms

### Borrowing System
- [ ] "Request to Borrow" functionality for available items
- [ ] Borrowing terms confirmation (duration, return date)
- [ ] Borrow request tracking and status updates
- [ ] Borrowing history and current loans dashboard

### Lending Management
- [ ] Receive and review incoming borrow requests
- [ ] Approve or decline requests with messaging
- [ ] Track items currently on loan
- [ ] Item return acknowledgment system

### Notifications & Messaging
- [ ] Real-time notifications for request updates
- [ ] Due date reminders for borrowed items
- [ ] In-app messaging between lenders and borrowers
- [ ] Email notifications for important updates

### Profile Management
- [ ] Personal profile with contact information
- [ ] Borrowing history and statistics
- [ ] Lending history and item management
- [ ] Account settings and preferences

### Security & Compliance
- [ ] Item validity verification system
- [ ] Platform policy compliance checks
- [ ] Secure data handling and privacy protection
- [ ] User rating and review system


## User Stories
- As a user, I can list items I own and am willing to lend.
- As a user, I can request to borrow items.
- As an owner, I can track who has what and when it's due back.

## Database Schema
![OpenShelf Database Relationships](OpenShelfDatabase.PNG)


## Getting Started
To get started with OpenShelf, follow these steps:

1. **Clone the repository.**  
   Make sure you have the proper access to the repository and your SSH keys are set up correctly.
   ```bash
   git clone git@github.com:freeCodeCamp-2025-Summer-Hackathon/OpenShelf.git

   ```
2. **Navigate to the project directory:**
   ```bash
   cd OpenShelf
   ```
---

<div align="center">
  This project is part of the <strong>freeCodeCamp 2025 Summer Hackathon</strong>, created by <strong>Team Lavender</strong>.
</div>

<div align="center">

# OpenShelf API Documentation

</div>


## Table of Contents
1. [Setup Instructions](#setup-instructions)
2. [Base URL](#base-url)
3. [Authentication](#authentication)
4. [User Endpoints](#user-endpoints)
5. [Item Endpoints](#item-endpoints)
6. [Borrow Request Endpoints](#borrow-request-endpoints)
7. [Messaging Endpoints](#messaging-endpoints)
8. [Error Handling](#error-handling)
9. [Google OAuth Register](#google-oauth-register)
---

## Setup Instructions

### Prerequisites
- Python 3.8 or higher
- PostgreSQL 12 or higher
- pip package manager

### 1. Database Setup

**Create PostgreSQL Database:**
```bash
PGPASSWORD=postgres psql -h localhost -p 5432 -U postgres -c "CREATE DATABASE openshelf;" 2>/dev/null
```

**Alternative manual setup:**
```bash
# Login to PostgreSQL
psql -h localhost -p 5432 -U postgres

# Create database (inside psql prompt)
CREATE DATABASE openshelf;

# Exit psql
\q
```

**Access your database from terminal:**
```bash
PGPASSWORD=postgres psql -h localhost -p 5432 -U postgres -d openshelf
```

**Note:** Replace `postgres` with your actual PostgreSQL password if different. You can also modify the host (`localhost`), port (`5432`), or username (`postgres`) based on your PostgreSQL setup.

### 2. Backend Setup

**Navigate to backend directory:**
```bash
cd backend
```

**Create and activate virtual environment:**
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

**Install Python dependencies:**
```bash
pip install -r requirements.txt
```

**Configure database settings:**
Update `backend/settings.py` with your PostgreSQL credentials:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'openshelf',
        'USER': 'postgres',          # Replace with your username
        'PASSWORD': 'postgres',      # Replace with your password
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

**Run database migrations:**
```bash
python manage.py makemigrations
python manage.py migrate
```

**Create superuser (optional):**
```bash
python manage.py createsuperuser
```

**Start the development server:**
```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000`

### 3. Testing the Setup

**Test database connection:**
```bash
python manage.py dbshell
```

**Run tests:**
```bash
python manage.py test
```

**Check API endpoints:**
```bash
# Test user registration
curl -X POST http://localhost:8000/api/users/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "testpass123",
    "password_confirm": "testpass123",
    "phone_num": 1234567890,
    "address": "123 Test St"
  }'
```

---

## Base URL
```
http://localhost:8000
```

## Authentication
The API uses **session-based authentication** with CSRF exemption for API endpoints.

### Authentication Flow:
1. Register a new user or login with existing credentials
2. Session cookies are automatically managed by the browser/Postman
3. For protected endpoints, you must be logged in

---

## User Endpoints

### 1. Register User
**Create a new user account**

- **URL:** `POST /api/users/register/`
- **Authentication:** Not required
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123",
    "password_confirm": "securepassword123",
    "phone_num": 1234567890,
    "address": "123 Main St, City, State"
  }
  ```
- **Success Response (201):**
  ```json
  {
    "message": "User created successfully",
    "user_id": "123e4567-e89b-12d3-a456-426614174000"
  }
  ```
- **Error Response (400):**
  ```json
  {
    "password": ["Passwords don't match"],
    "email": ["User with this email already exists."]
  }
  ```

### 2. Login User
**Authenticate user and create session**

- **URL:** `POST /api/users/login/`
- **Authentication:** Not required
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Success Response (200):**
  ```json
  {
    "message": "Login successful",
    "user": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "John Doe",
      "email": "john@example.com",
      "phone_num": 1234567890,
      "address": "123 Main St, City, State"
    }
  }
  ```
- **Error Response (401):**
  ```json
  {
    "error": "Invalid credentials"
  }
  ```

### 3. Get User Profile
**Get current user's profile information**

- **URL:** `GET /api/users/profile/`
- **Authentication:** Required
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Success Response (200):**
  ```json
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "John Doe",
    "email": "john@example.com",
    "phone_num": 1234567890,
    "address": "123 Main St, City, State"
  }
  ```
- **Error Response (401):**
  ```json
  {
    "detail": "Authentication credentials were not provided."
  }
  ```

### 4. Update User Profile
**Update current user's profile information**

- **URL:** `PUT /api/users/profile/`
- **Authentication:** Required
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Request Body:**
  ```json
  {
    "name": "Updated Name",
    "phone_num": 9876543210,
    "address": "456 Updated St, New City"
  }
  ```
- **Success Response (200):**
  ```json
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Updated Name",
    "email": "john@example.com",
    "phone_num": 9876543210,
    "address": "456 Updated St, New City"
  }
  ```

### 5. Logout User
**End user session**

- **URL:** `POST /api/users/logout/`
- **Authentication:** Required
- **Success Response (200):**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

---

## Item Endpoints

### 1. List All Items
**Get all available items**

- **URL:** `GET /api/items/`
- **Authentication:** Not required
- **Success Response (200):**
  ```json
  {
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
      {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "title": "Programming Book",
        "category": "books",
        "condition": "New",
        "image_urls": ["https://example.com/book.jpg"],
        "is_available": true,
        "owner_name": "John Doe",
        "number_of_items": 1
      }
    ]
  }
  ```

### 2. Create Item
**Create a new item for lending**

- **URL:** `POST /api/items/create/`
- **Authentication:** Required
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Request Body:**
  ```json
  {
    "title": "Programming Book",
    "category": "books",
    "description": "Learn Python programming from scratch",
    "condition": "New",
    "tags": ["python", "programming", "book", "tutorial"],
    "image_urls": ["https://example.com/book.jpg"],
    "number_of_items": 1,
    "is_available": true
  }
  ```
- **Success Response (201):**
  ```json
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Programming Book",
    "category": "books",
    "tags": ["python", "programming", "book", "tutorial"],
    "description": "Learn Python programming from scratch",
    "condition": "New",
    "image_urls": ["https://example.com/book.jpg"],
    "number_of_items": 1,
    "is_available": true
  }
  ```
- **Error Response (400):**
  ```json
  {
    "title": ["This field is required."],
    "condition": ["Select a valid choice. Invalid is not one of the available choices."]
  }
  ```

### 3. Get Item Details
**Get detailed information about a specific item**

- **URL:** `GET /api/items/{item_id}/`
- **Authentication:** Not required
- **URL Parameters:**
  - `item_id` (UUID): The ID of the item
- **Example:** `GET /api/items/123e4567-e89b-12d3-a456-426614174000/`
- **Success Response (200):**
  ```json
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "owner": {
      "id": "456e4567-e89b-12d3-a456-426614174000",
      "name": "John Doe",
      "email": "john@example.com",
      "phone_num": 1234567890,
      "address": "123 Main St"
    },
    "title": "Programming Book",
    "category": "books",
    "tags": ["python", "programming", "book"],
    "description": "Learn Python programming from scratch",
    "condition": "New",
    "image_urls": ["https://example.com/book.jpg"],
    "number_of_items": 1,
    "is_available": true
  }
  ```
- **Error Response (404):**
  ```json
  {
    "detail": "Not found."
  }
  ```

### 4. Update Item
**Update an existing item (only item owner)**

- **URL:** `PUT /api/items/{item_id}/update/`
- **Authentication:** Required (must be item owner)
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Request Body:**
  ```json
  {
    "title": "Updated Book Title",
    "description": "Updated description",
    "condition": "Used",
    "is_available": false
  }
  ```
- **Success Response (200):**
  ```json
  {
    "title": "Updated Book Title",
    "category": "books",
    "description": "Updated description",
    "condition": "Used",
    "tags": ["python", "programming", "book"],
    "image_urls": ["https://example.com/book.jpg"],
    "number_of_items": 1,
    "is_available": false
  }
  ```

### 5. Delete Item
**Delete an item (only item owner)**

- **URL:** `DELETE /api/items/{item_id}/delete/`
- **Authentication:** Required (must be item owner)
- **Success Response (204):** No content
- **Error Response (404):**
  ```json
  {
    "detail": "Not found."
  }
  ```

### 6. Get My Items
**Get all items owned by current user**

- **URL:** `GET /api/items/my-items/`
- **Authentication:** Required
- **Success Response (200):**
  ```json
  {
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
      {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "title": "My Programming Book",
        "category": "books",
        "condition": "New",
        "image_urls": ["https://example.com/book.jpg"],
        "is_available": true,
        "owner_name": "John Doe",
        "number_of_items": 1
      }
    ]
  }
  ```

### 7. Search Items
**Search items by title, description, tags, or category**

- **URL:** `GET /api/items/search/`
- **Authentication:** Not required
- **Query Parameters:**
  - `q` (optional): Search query (searches title, description, and tags)
  - `category` (optional): Filter by category
- **Examples:**
  - `GET /api/items/search/?q=python`
  - `GET /api/items/search/?category=books`
  - `GET /api/items/search/?q=programming&category=books`
- **Success Response (200):**
  ```json
  [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Python Programming Book",
      "category": "books",
      "condition": "New",
      "image_urls": ["https://example.com/book.jpg"],
      "is_available": true,
      "owner_name": "John Doe",
      "number_of_items": 1
    }
  ]
  ```

---

## Borrow Request Endpoints

### 1. Request to Borrow Item
**Create a request to borrow an item from another user**

- **URL:** `POST /api/borrow-requests/create/`
- **Authentication:** Required
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Request Body Fields:**
  - `item_id` (UUID, required): The ID of the item you want to borrow
  - `expected_return_date` (ISO 8601 datetime, required): When you plan to return the item (must be in the future)
  - `notes` (string, optional): Additional message to the item owner
- **Request Body:**
  ```json
  {
    "item_id": "123e4567-e89b-12d3-a456-426614174000",
    "expected_return_date": "2024-01-20T10:00:00Z",
    "notes": "Hi! I would like to borrow this book for my studies. I'll take good care of it."
  }
  ```
- **Success Response (201):**
  ```json
  {
    "id": "456e4567-e89b-12d3-a456-426614174000",
    "item": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Programming Book",
      "category": "books",
      "condition": "New",
      "image_urls": ["https://example.com/book.jpg"],
      "is_available": true,
      "owner_name": "John Doe",
      "number_of_items": 1
    },
    "borrower": {
      "id": "789e4567-e89b-12d3-a456-426614174000",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "phone_num": 1234567890,
      "address": "123 Main St"
    },
    "owner": {
      "id": "abc4567-e89b-12d3-a456-426614174000",
      "name": "John Doe",
      "email": "john@example.com",
      "phone_num": 9876543210,
      "address": "456 Oak Ave"
    },
    "status": "pending",
    "request_date": "2024-01-15T10:30:00Z",
    "expected_return_date": "2024-01-20T10:00:00Z",
    "return_date": null,
    "notes": "Hi! I would like to borrow this book for my studies. I'll take good care of it.",
    "decline_reason": null
  }
  ```
- **Error Response (400):**
  ```json
  {
    "item_id": ["Item is not available for borrowing"],
    "expected_return_date": ["Expected return date must be in the future"]
  }
  ```

### 2. Get My Borrow Requests
**Get all items you've requested to borrow**

- **URL:** `GET /api/borrow-requests/my-requests/`
- **Authentication:** Required
- **Success Response (200):**
  ```json
  {
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
      {
        "id": "456e4567-e89b-12d3-a456-426614174000",
        "item_title": "Programming Book",
        "borrower_name": "John Doe",
        "owner_name": "Alice Smith",
        "status": "pending",
        "request_date": "2025-07-09T10:30:00Z",
        "expected_return_date": "2025-07-15T10:00:00Z",
        "return_date": null,
        "notes": "Hi! I would like to borrow this book for my studies."
      }
    ]
  }
  ```

### 3. Get My Lending Requests
**Get all requests from others to borrow your items**

- **URL:** `GET /api/borrow-requests/my-lending/`
- **Authentication:** Required
- **Success Response (200):**
  ```json
  {
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
      {
        "id": "789e4567-e89b-12d3-a456-426614174000",
        "item_title": "Electric Drill",
        "borrower_name": "Bob Wilson",
        "owner_name": "Alice Smith",
        "status": "pending",
        "request_date": "2025-07-09T09:15:00Z",
        "expected_return_date": "2025-07-12T18:00:00Z",
        "return_date": null,
        "notes": "Need this for a weekend project. Will return by Monday."
      }
    ]
  }
  ```

### 4. Get Borrow Request Details
**Get detailed information about a specific borrow request**

- **URL:** `GET /api/borrow-requests/{request_id}/`
- **Authentication:** Required (must be borrower or owner)
- **Success Response (200):**
  ```json
  {
    "id": "789e4567-e89b-12d3-a456-426614174000",
    "item": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Electric Drill",
      "category": "tools",
      "description": "Cordless electric drill with battery pack",
      "condition": "Used - Like New"
    },
    "borrower": {
      "id": "456e4567-e89b-12d3-a456-426614174000",
      "name": "Bob Wilson",
      "email": "bob@example.com",
      "phone_num": 5551234567
    },
    "owner": {
      "id": "789e4567-e89b-12d3-a456-426614174000",
      "name": "Alice Smith",
      "email": "alice@example.com"
    },
    "status": "pending",
    "request_date": "2025-07-09T09:15:00Z",
    "expected_return_date": "2025-07-12T18:00:00Z",
    "return_date": null,
    "notes": "Need this for a weekend project.",
    "decline_reason": null
  }
  ```

### 5. Accept Borrow Request
**Item owner accepts a borrow request**

- **URL:** `POST /api/borrow-requests/{request_id}/accept/`
- **Authentication:** Required (must be item owner)
- **Success Response (200):**
  ```json
  {
    "id": "789e4567-e89b-12d3-a456-426614174000",
    "item": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Electric Drill",
      "is_available": false
    },
    "borrower": {
      "name": "Bob Wilson",
      "email": "bob@example.com",
      "phone_num": 5551234567
    },
    "status": "accepted",
    "request_date": "2025-07-09T09:15:00Z",
    "expected_return_date": "2025-07-12T18:00:00Z"
  }
  ```

### 6. Decline Borrow Request
**Item owner declines a borrow request**

- **URL:** `POST /api/borrow-requests/{request_id}/decline/`
- **Authentication:** Required (must be item owner)
- **Request Body (optional):**
  ```json
  {
    "decline_reason": "Sorry, I need it for my own project this week."
  }
  ```
- **Success Response (200):**
  ```json
  {
    "id": "789e4567-e89b-12d3-a456-426614174000",
    "status": "declined",
    "decline_reason": "Sorry, I need it for my own project this week.",
    "request_date": "2025-07-09T09:15:00Z",
    "expected_return_date": "2025-07-12T18:00:00Z"
  }
  ```

### 7. Mark Item as Returned
**Item owner marks the item as returned**

- **URL:** `POST /api/borrow-requests/{request_id}/returned/`
- **Authentication:** Required (must be item owner)
- **Success Response (200):**
  ```json
  {
    "id": "789e4567-e89b-12d3-a456-426614174000",
    "item": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Electric Drill",
      "is_available": true
    },
    "status": "returned",
    "request_date": "2025-07-09T09:15:00Z",
    "expected_return_date": "2025-07-12T18:00:00Z",
    "return_date": "2025-07-12T14:30:00Z"
  }
  ```

### Borrow Request Status Flow:
```
pending → accepted → returned
      ↘ declined
```

### Business Rules:
- ✅ Users can request any available item (except their own)
- ✅ Only one pending request per item per user
- ✅ Expected return date must be provided and must be in the future
- ✅ Item automatically becomes unavailable when accepted
- ✅ Item automatically becomes available when returned
- ❌ Cannot borrow own items or unavailable items

---

## Messaging Endpoints

### 1. Send Message
**Send a message to another user**

- **URL:** `POST /api/messaging/send/`
- **Authentication:** Required
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Request Body Fields:**
  - `receiver_id` (UUID, required): The ID of the user to send the message to
  - `message` (string, required): The message content
- **Request Body:**
  ```json
  {
    "receiver_id": "123e4567-e89b-12d3-a456-426614174000",
    "message": "Hi! I'm interested in borrowing your programming book. Is it still available?"
  }
  ```
- **Success Response (201):**
  ```json
  {
    "id": "789e4567-e89b-12d3-a456-426614174000",
    "conversation_id": "abc4567-e89b-12d3-a456-426614174000",
    "sender": {
      "id": "456e4567-e89b-12d3-a456-426614174000",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "phone_num": 1234567890,
      "address": "123 Main St"
    },
    "receiver": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "John Doe",
      "email": "john@example.com",
      "phone_num": 9876543210,
      "address": "456 Oak Ave"
    },
    "message": "Hi! I'm interested in borrowing your programming book. Is it still available?",
    "timestamp": "2025-07-09T10:30:00Z",
    "read": false
  }
  ```
- **Error Response (400):**
  ```json
  {
    "receiver_id": ["Receiver not found"],
    "message": ["This field is required."]
  }
  ```

### 2. Get Conversations
**Get all conversations for the current user**

- **URL:** `GET /api/messaging/conversations/`
- **Authentication:** Required
- **Success Response (200):**
  ```json
  [
    {
      "conversation_id": "abc4567-e89b-12d3-a456-426614174000",
      "other_user": {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "name": "John Doe",
        "email": "john@example.com",
        "phone_num": 9876543210,
        "address": "456 Oak Ave"
      },
      "last_message": {
        "id": "789e4567-e89b-12d3-a456-426614174000",
        "message": "Sure! When do you need it?",
        "timestamp": "2025-07-09T11:15:00Z",
        "sender_name": "John Doe",
        "read": false
      },
      "unread_count": 2
    }
  ]
  ```

### 3. Get Messages in Conversation
**Get all messages in a specific conversation**

- **URL:** `GET /api/messaging/conversations/{conversation_id}/`
- **Authentication:** Required (must be participant in conversation)
- **URL Parameters:**
  - `conversation_id` (UUID): The ID of the conversation
- **Success Response (200):**
  ```json
  [
    {
      "id": "789e4567-e89b-12d3-a456-426614174000",
      "message": "Hi! I'm interested in borrowing your programming book.",
      "timestamp": "2025-07-09T10:30:00Z",
      "read": true,
      "sender_name": "Jane Smith",
      "receiver_name": "John Doe"
    },
    {
      "id": "def4567-e89b-12d3-a456-426614174000",
      "message": "Sure! When do you need it?",
      "timestamp": "2025-07-09T11:15:00Z",
      "read": false,
      "sender_name": "John Doe",
      "receiver_name": "Jane Smith"
    }
  ]
  ```
- **Error Response (404):**
  ```json
  {
    "detail": "Conversation not found or access denied."
  }
  ```

### 4. Get Conversation with Specific User
**Get or start a conversation with a specific user**

- **URL:** `GET /api/messaging/conversations/with-user/{user_id}/`
- **Authentication:** Required
- **URL Parameters:**
  - `user_id` (UUID): The ID of the user to chat with
- **Success Response (200):**
  ```json
  {
    "conversation_id": "abc4567-e89b-12d3-a456-426614174000",
    "other_user": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "messages": [
      {
        "id": "789e4567-e89b-12d3-a456-426614174000",
        "message": "Hi! I'm interested in your book.",
        "timestamp": "2025-07-09T10:30:00Z",
        "read": true,
        "sender_name": "Jane Smith",
        "receiver_name": "John Doe"
      }
    ]
  }
  ```
- **Error Response (404):**
  ```json
  {
    "error": "User not found"
  }
  ```

### 5. Mark Message as Read
**Mark a specific message as read**

- **URL:** `PUT /api/messaging/messages/{message_id}/read/`
- **Authentication:** Required (must be the receiver)
- **URL Parameters:**
  - `message_id` (UUID): The ID of the message to mark as read
- **Success Response (200):**
  ```json
  {
    "message": "Message marked as read"
  }
  ```
- **Error Response (404):**
  ```json
  {
    "error": "Message not found or not authorized"
  }
  ```

### 6. Get Unread Messages Count
**Get the total count of unread messages for current user**

- **URL:** `GET /api/messaging/unread-count/`
- **Authentication:** Required
- **Success Response (200):**
  ```json
  {
    "unread_count": 5
  }
  ```

### Messaging Business Rules:
- ✅ Users can send messages to any other user
- ✅ Users can only read messages in conversations they're part of
- ✅ Messages are automatically marked as read when viewing a conversation
- ✅ Conversation ID is automatically generated based on participant user IDs
- ✅ Users cannot send messages to themselves
- ❌ Cannot message non-existent users

---

## Error Handling

### Common HTTP Status Codes:
- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **204 No Content**: Request successful (no content to return)
- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Permission denied
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

### Error Response Format:
```json
{
  "detail": "Error message",
  "field_name": ["Field-specific error message"]
}
```

---


## Google OAUth Register

### Pre-requisites
- Google Developer Console Setup
- Google OAUth Playground Test

### 1. Google Developer Console Setup
- Go to [Google Developer Console](https://console.cloud.google.com/apis/credentials)
- Select your OAuth 2.0 Client ID (Web Application type).
- Under **Authorized Redirect URIs**, add:
```bash
http://127.0.0.1:8000/accounts/google/login/callback/ # for django-allauth
https://developers.google.com/oauthplayground
```
- Save
- Copy the **ClientId** and **ClientSecret** and paste it in:
```python
SOCIALACCOUNT_PROVIDERS = {
    'google':{
        'APP': {
            'client_id': 'your_client_id', #your CientId
            'secret': 'your_client_secret' #your ClientSecret
            'key': '',
        },
        'SCOPE':['profile','email'],
        'AUTH_PARAMS':{'access_type':'online'},
        'OAUTH_PKCE_ENABLED':True,
    }
}
```


### 2. Google OAuth Playground
- Go to [Google OAuth Playground](https://developers.google.com/oauthplayground/)
- Go to Settings
- Check **Use your OAuth Credentials**
- Enter **CleintId** and **ClientSecret**
- Select the following scopes:
```
https://www.googleapis.com/auth/userinfo.email
https://www.googleapis.com/auth/userinfo.profile
openid
```
- Click Authorize APIs
- Grant Permission
- Click **Exchange Authorization Code for Tokens**
- Copy the **id_token** which is your google ID token

### 3. Making OAuth Request in Postman
- Try calling the API with this:
- **URL:** `POST /api/users/google/`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Request Body:**
  ```json
  {
    "token":"google_id_token"
  }
  ```
- **Success Response (200):**
  ```json
  {
    "access": "access_token",
    "refresh": "refresh_token"
  }
  ```

  ---