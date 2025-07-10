from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from .models import Item
from .serializers import ItemSerializer, ItemCreateSerializer, ItemListSerializer, ItemDetailSerializer


class ItemListView(generics.ListAPIView):
    serializer_class = ItemListSerializer
    
    def get_queryset(self):
        return Item.objects.filter(is_available=True).select_related('owner')


class ItemCreateView(generics.CreateAPIView):
    serializer_class = ItemCreateSerializer
    permission_classes = [IsAuthenticated]


class ItemDetailView(generics.RetrieveAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemDetailSerializer


class ItemUpdateView(generics.UpdateAPIView):
    serializer_class = ItemCreateSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Item.objects.filter(owner=self.request.user)


class ItemDeleteView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Item.objects.filter(owner=self.request.user)


class MyItemsView(generics.ListAPIView):
    serializer_class = ItemListSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Item.objects.filter(owner=self.request.user)


@api_view(['GET'])
def search_items(request):
    query = request.GET.get('q', '')
    category = request.GET.get('category', '')
    
    items = Item.objects.filter(is_available=True)
    
    if query:
        items = items.filter(
            Q(title__icontains=query) | 
            Q(description__icontains=query) |
            Q(tags__icontains=[query])
        )
    
    if category:
        items = items.filter(category=category)
    
    serializer = ItemListSerializer(items, many=True)
    return Response(serializer.data)
