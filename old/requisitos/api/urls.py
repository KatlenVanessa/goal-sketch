from django.urls import path
from .views import ProcessarEntrevistaView, RequisitoListView

urlpatterns = [
    path('processar-entrevista/', ProcessarEntrevistaView.as_view(), name='processar-entrevista'),
    path('requisitos/', RequisitoListView.as_view(), name='lista-requisitos'),
]
