from django.db import models

# Create your models here.
class Categoria(models.Model):
    nome = models.CharField(max_langht = 50, unique=True)

    def __str__(self):
        return self.nome
    