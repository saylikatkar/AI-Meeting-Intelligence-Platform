
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.db import IntegrityError, transaction

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


User = get_user_model()


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    full_name = request.data.get("full_name", "").strip()
    email = request.data.get("email", "").strip().lower()
    password = request.data.get("password", "")
    confirm_password = request.data.get("confirm_password", "")

    if not all([full_name, email, password, confirm_password]):
        return Response(
            {"error": "All fields are required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if password != confirm_password:
        return Response(
            {"error": "Passwords do not match."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if len(full_name) > 150:
        return Response(
            {"error": "Full name must be 150 characters or fewer."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if User.objects.filter(email__iexact=email).exists():
        return Response(
            {"error": "This email is already registered."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        validate_password(password)
    except ValidationError as exc:
        return Response(
            {"error": list(exc.messages)},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        with transaction.atomic():
            user = User.objects.create_user(
                username=email,
                email=email,
                password=password,
                first_name=full_name,
            )
    except IntegrityError:
        return Response(
            {"error": "Could not create the account. Please try again."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    return Response(
        {
            "message": "Registration successful.",
            "user": {
                "id": user.id,
                "full_name": user.first_name,
                "email": user.email,
            },
        },
        status=status.HTTP_201_CREATED,
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get("email", "").strip().lower()
    password = request.data.get("password", "")

    if not email or not password:
        return Response(
            {"error": "Email and password are required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = authenticate(
        request,
        username=email,
        password=password,
    )

    if user is None:
        return Response(
            {"error": "Invalid email or password."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    refresh = RefreshToken.for_user(user)

    return Response(
        {
            "message": "Login successful.",
            "user": {
                "id": user.id,
                "full_name": user.first_name,
                "email": user.email,
            },
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        },
        status=status.HTTP_200_OK,
    )
