from flask import Flask
from flask_cors import CORS
import networkx as nx

def create_app():
    app = Flask(__name__)
    CORS(app)  # Permitir CORS para todas as rotas

    # Inicializar o grafo aqui ou carregar de um estado salvo
    app.graph = None

    # Importar as rotas após a criação do app
    from .routes import init_routes
    init_routes(app)

    return app
