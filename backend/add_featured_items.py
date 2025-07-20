import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth import get_user_model
from items.models import Item

User = get_user_model()

def add_featured_items():
    # Get the first user or create one if none exists
    try:
        user = User.objects.first()
        if not user:
            print("No users found. Creating a test user...")
            user = User.objects.create_user(
                email='test@example.com', 
                password='testpassword123',
                name='Test User'
            )
            print(f"Created user: {user.email}")
    except Exception as e:
        print(f"Error getting or creating user: {e}")
        return

    # Create featured items
    featured_books = [
        {
            'title': 'The Great Gatsby',
            'category': 'Books',
            'tags': ['featured', 'classic', 'fiction'],
            'description': 'F. Scott Fitzgerald\'s classic novel about the American Dream.',
            'condition': 'Used',
            'image_urls': [],
            'number_of_items': 1,
        },
        {
            'title': 'To Kill a Mockingbird',
            'category': 'Books',
            'tags': ['featured', 'classic', 'fiction'],
            'description': 'Harper Lee\'s Pulitzer Prize-winning novel about racial injustice.',
            'condition': 'Used - Like New',
            'image_urls': [],
            'number_of_items': 1,
        },
        {
            'title': 'Power Drill Set',
            'category': 'Tools',
            'tags': ['featured', 'tools', 'diy'],
            'description': 'Professional power drill set with multiple bits and attachments.',
            'condition': 'New',
            'image_urls': [],
            'number_of_items': 1,
        }
    ]

    # Add items to the database
    created_items = []
    for item_data in featured_books:
        try:
            item = Item.objects.create(
                owner=user,
                **item_data
            )
            created_items.append(item)
            print(f"Created item: {item.title}")
        except Exception as e:
            print(f"Error creating item {item_data['title']}: {e}")

    print(f"\nSuccessfully created {len(created_items)} featured items")

if __name__ == '__main__':
    print("Adding featured items...")
    add_featured_items()
    print("Done!")
