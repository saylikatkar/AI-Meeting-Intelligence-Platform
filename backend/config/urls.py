from django.contrib import admin
from django.urls import path
from accounts.views import register, login

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/register/", register, name="register"),
    path("api/auth/login/", login, name="login"),
]