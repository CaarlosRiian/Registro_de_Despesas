from django.db import models

# Create your models here.
class Categoria(models.Model):
    nome = models.CharField(max_langht = 50, unique=True)

    def __str__(self):
        return self.nome

class Despesa(models.Model):
    descricao = models.Charfild(max_length=100)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    data = models.DateField()
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)

    def __str__(self):
        return  "descrição: {}, valor:{}, data: {}, catergoria: {}".format(self.descricao, self.valor, self.data, self.categoria.nome)