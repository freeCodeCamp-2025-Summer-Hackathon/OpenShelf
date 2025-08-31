#!/usr/bin/env python
"""
NeonDB Migration Script for OpenShelf
Run this script to set up your database schema on NeonDB
"""

import os
import sys
import django
from pathlib import Path

# Add the backend directory to Python path
backend_dir = Path(__file__).resolve().parent
sys.path.append(str(backend_dir))

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.core.management import execute_from_command_line
from django.db import connection
from django.contrib.auth import get_user_model

def check_database_connection():
    """Test database connection"""
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
        print("✅ Database connection successful!")
        return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False

def run_migrations():
    """Run Django migrations"""
    try:
        print("🔄 Creating migration files...")
        execute_from_command_line(['manage.py', 'makemigrations'])
        
        print("🔄 Applying migrations...")
        execute_from_command_line(['manage.py', 'migrate'])
        
        print("✅ Migrations completed successfully!")
        return True
    except Exception as e:
        print(f"❌ Migration failed: {e}")
        return False

def create_superuser():
    """Create a superuser if none exists"""
    try:
        User = get_user_model()
        if not User.objects.filter(is_superuser=True).exists():
            print("🔄 Creating superuser...")
            email = input("Enter superuser email: ")
            name = input("Enter superuser name: ")
            password = input("Enter superuser password: ")
            
            User.objects.create_superuser(
                email=email,
                name=name,
                password=password
            )
            print("✅ Superuser created successfully!")
        else:
            print("ℹ️ Superuser already exists")
    except Exception as e:
        print(f"❌ Superuser creation failed: {e}")

def show_database_info():
    """Show database information"""
    with connection.cursor() as cursor:
        # Get database name
        cursor.execute("SELECT current_database();")
        db_name = cursor.fetchone()[0]
        
        # Get all tables
        cursor.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name;
        """)
        tables = [row[0] for row in cursor.fetchall()]
        
        print(f"\n📊 Database Information:")
        print(f"Database: {db_name}")
        print(f"Tables created: {len(tables)}")
        print("Tables:")
        for table in tables:
            print(f"  - {table}")

def main():
    print("🚀 OpenShelf NeonDB Setup")
    print("=" * 40)
    
    # Check if DATABASE_URL is set
    if not os.environ.get('DATABASE_URL'):
        print("❌ DATABASE_URL environment variable not set!")
        print("Please set your NeonDB connection string:")
        print("export DATABASE_URL='postgresql://username:password@host/database?sslmode=require'")
        return
    
    # Check database connection
    if not check_database_connection():
        return
    
    # Run migrations
    if not run_migrations():
        return
    
    # Show database info
    show_database_info()
    
    # Ask about superuser creation
    create_super = input("\n🤔 Create superuser? (y/n): ").lower().strip()
    if create_super in ['y', 'yes']:
        create_superuser()
    
    print("\n🎉 Database setup completed!")
    print("\nNext steps:")
    print("1. Update your Render environment variables with the DATABASE_URL")
    print("2. Deploy your application")
    print("3. Access your admin panel at: https://your-domain.onrender.com/admin/")

if __name__ == "__main__":
    main()
