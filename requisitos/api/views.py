from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Requisito
from .serializers import RequisitoSerializer
import spacy

nlp = spacy.load("pt_core_news_sm")

class ProcessarEntrevistaView(APIView):
    def post(self, request):
        texto = request.data.get("texto")
        if not texto:
            return Response({"error": "Texto é obrigatório"}, status=status.HTTP_400_BAD_REQUEST)
        
        doc = nlp(texto)
        requisitos = []
        for sent in doc.sents:
            if "deve" in sent.text.lower() or "precisa" in sent.text.lower():
                tipo = "Funcional" if "deve" in sent.text.lower() else "Não Funcional"
                requisito = Requisito(descricao=sent.text.strip(), tipo=tipo)
                requisito.save()
                requisitos.append(requisito)
        
        serializer = RequisitoSerializer(requisitos, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class RequisitoListView(APIView):
    def get(self, request):
        requisitos = Requisito.objects.all()
        serializer = RequisitoSerializer(requisitos, many=True)
        return Response(serializer.data)
