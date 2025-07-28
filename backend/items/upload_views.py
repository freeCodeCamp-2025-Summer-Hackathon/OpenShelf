from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.core.files.storage import default_storage
from django.conf import settings
import os
import uuid


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_images(request):
    """
    Upload multiple images and return their URLs
    """
    if 'images' not in request.FILES:
        return Response({'error': 'No images provided'}, status=status.HTTP_400_BAD_REQUEST)
    
    uploaded_urls = []
    
    for image in request.FILES.getlist('images'):
        # Validate file type
        if not image.content_type.startswith('image/'):
            return Response({'error': f'File {image.name} is not an image'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Generate unique filename
        ext = os.path.splitext(image.name)[1]
        filename = f"{uuid.uuid4()}{ext}"
        
        # Save file
        file_path = default_storage.save(f'items/{filename}', image)
        
        # Store relative path (without domain)
        relative_path = f"{settings.MEDIA_URL}{file_path}"
        uploaded_urls.append(relative_path)
    
    return Response({'image_urls': uploaded_urls}, status=status.HTTP_201_CREATED)
