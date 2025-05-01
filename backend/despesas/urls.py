from django.urls import path
from rest_framework import routers
from .views import DespesaViewSet, CategotiaViewSet

router = routers.DefaultRouter()
router.register("despesas", DespesaViewSet, basename="despesas")
router.register("categorias", CategotiaViewSet, basename="categorias")
urlpatterns = router.urls

