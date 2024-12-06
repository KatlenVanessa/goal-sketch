from rest_framework import serializers
from .models import Requisito

class RequisitoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requisito
        fields = '__all__'
