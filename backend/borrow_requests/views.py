from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Q
from django.utils import timezone
from .models import BorrowRequest
from .serializers import (
    BorrowRequestSerializer,
    BorrowRequestCreateSerializer,
    BorrowRequestUpdateSerializer,
    BorrowRequestListSerializer
)

class BorrowRequestCreateView(generics.CreateAPIView):
    queryset = BorrowRequest.objects.all()
    serializer_class = BorrowRequestCreateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        borrow_request = serializer.save()
        
        # Return the full borrow request data including request_date and return_date
        response_serializer = BorrowRequestSerializer(borrow_request)
        headers = self.get_success_headers(response_serializer.data)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class BorrowRequestDetailView(generics.RetrieveAPIView):
    queryset = BorrowRequest.objects.all()
    serializer_class = BorrowRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return BorrowRequest.objects.filter(
            Q(borrower=user) | Q(owner=user)
        )

class BorrowRequestUpdateView(generics.UpdateAPIView):
    queryset = BorrowRequest.objects.all()
    serializer_class = BorrowRequestUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only owners can update the status of borrow requests
        return BorrowRequest.objects.filter(owner=self.request.user)

class MyBorrowRequestsView(generics.ListAPIView):
    serializer_class = BorrowRequestListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return BorrowRequest.objects.filter(borrower=self.request.user)

class MyLendingRequestsView(generics.ListAPIView):
    serializer_class = BorrowRequestListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return BorrowRequest.objects.filter(owner=self.request.user)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def accept_borrow_request(request, pk):
    try:
        borrow_request = BorrowRequest.objects.get(
            pk=pk, 
            owner=request.user,
            status='pending'
        )
        borrow_request.status = 'accepted'
        borrow_request.save()
        
        # Update item availability
        item = borrow_request.item
        item.is_available = False
        item.save()
        
        return Response(BorrowRequestSerializer(borrow_request).data)
    except BorrowRequest.DoesNotExist:
        return Response(
            {'error': 'Borrow request not found or not authorized'}, 
            status=status.HTTP_404_NOT_FOUND
        )

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def decline_borrow_request(request, pk):
    try:
        borrow_request = BorrowRequest.objects.get(
            pk=pk, 
            owner=request.user,
            status='pending'
        )
        borrow_request.status = 'declined'
        borrow_request.decline_reason = request.data.get('decline_reason', '')
        borrow_request.save()
        
        return Response(BorrowRequestSerializer(borrow_request).data)
    except BorrowRequest.DoesNotExist:
        return Response(
            {'error': 'Borrow request not found or not authorized'}, 
            status=status.HTTP_404_NOT_FOUND
        )

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def mark_as_returned(request, pk):
    try:
        borrow_request = BorrowRequest.objects.get(
            pk=pk, 
            owner=request.user,
            status='accepted'
        )
        borrow_request.status = 'returned'
        borrow_request.return_date = timezone.now()
        borrow_request.save()
        
        # Update item availability
        item = borrow_request.item
        item.is_available = True
        item.save()
        
        return Response(BorrowRequestSerializer(borrow_request).data)
    except BorrowRequest.DoesNotExist:
        return Response(
            {'error': 'Borrow request not found or not authorized'}, 
            status=status.HTTP_404_NOT_FOUND
        )
