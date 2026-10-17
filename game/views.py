
from django.shortcuts import render

def home(request):
    return render(request, 'game/home.html')

def game(request):
    return render(request, 'game/game.html')