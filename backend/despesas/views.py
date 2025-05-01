from django.shortcuts import render
from rest_framework import viewsets
from .models import Despesa, Categoria
from .serializers import DespesaSerializer, CategoriaSerializer
# Create your views here.

class CategotiaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    
class DespesaViewSet(viewsets.ModelViewSet):
    queryset = Despesa.objects.all()
    serializer_class = DespesaSerializer


