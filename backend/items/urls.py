from django.urls import path
from . import views

app_name = 'items'

urlpatterns = [
    path('', views.ItemListView.as_view(), name='item-list'),
    path('create/', views.ItemCreateView.as_view(), name='item-create'),
    path('my-items/', views.MyItemsView.as_view(), name='my-items'),
    path('search/', views.search_items, name='search-items'),
    path('<uuid:pk>/', views.ItemDetailView.as_view(), name='item-detail'),
    path('<uuid:pk>/update/', views.ItemUpdateView.as_view(), name='item-update'),
    path('<uuid:pk>/delete/', views.ItemDeleteView.as_view(), name='item-delete'),
]
