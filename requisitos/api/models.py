from django.db import models

class Requisito(models.Model):
    descricao = models.TextField()
    tipo = models.CharField(max_length=20, choices=[('Funcional', 'Funcional'), ('Não Funcional', 'Não Funcional')])

    def __str__(self):
        return self.descricao
