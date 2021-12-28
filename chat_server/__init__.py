from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv,find_dotenv
from os import environ

cors = CORS()
db = SQLAlchemy()

def chat_app():
    from .rooms import room
    from .services import sio
    from .models import Room

    app = Flask(__name__)
    load_dotenv(find_dotenv())

    app.config['SECRET_KEY'] = environ.get('SECRET_KEY') or 'thesecret'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
    
    db.init_app(app)
    sio.init_app(app, cors_allowed_origins='*')
    cors.init_app(app)

    app.register_blueprint(room,url_prefix='/room')

    with app.app_context():
        db.create_all()
        
    return sio,app