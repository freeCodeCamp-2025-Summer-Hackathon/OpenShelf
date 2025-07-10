from django.urls import path
from . import views

app_name = 'borrow_requests'

urlpatterns = [
    # Create borrow request
    path('create/', views.BorrowRequestCreateView.as_view(), name='create-borrow-request'),
    
    # View borrow request details
    path('<uuid:pk>/', views.BorrowRequestDetailView.as_view(), name='borrow-request-detail'),
    
    # Update borrow request
    path('<uuid:pk>/update/', views.BorrowRequestUpdateView.as_view(), name='update-borrow-request'),
    
    # My borrow requests (items I want to borrow)
    path('my-requests/', views.MyBorrowRequestsView.as_view(), name='my-borrow-requests'),
    
    # My lending requests (items others want to borrow from me)
    path('my-lending/', views.MyLendingRequestsView.as_view(), name='my-lending-requests'),
    
    # Accept borrow request
    path('<uuid:pk>/accept/', views.accept_borrow_request, name='accept-borrow-request'),
    
    # Decline borrow request
    path('<uuid:pk>/decline/', views.decline_borrow_request, name='decline-borrow-request'),
    
    # Mark as returned
    path('<uuid:pk>/returned/', views.mark_as_returned, name='mark-as-returned'),
]
