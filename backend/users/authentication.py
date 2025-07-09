from rest_framework.authentication import SessionAuthentication


class CsrfExemptSessionAuthentication(SessionAuthentication):
    """
    Custom SessionAuthentication that doesn't enforce CSRF checks.
    This is useful for API endpoints where CSRF protection is not needed.
    """
    
    def enforce_csrf(self, request):
        return  # To not perform the csrf check previously happening
