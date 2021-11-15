"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Position
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route('/positions', methods=['GET'])
def positions():
    list_positions = Position.query.all()
    return jsonify([position.serialize() for position in list_positions]), 200


@api.route('/user', methods=['POST'])
def create_user():
    name = request.json.get('name')
    email = request.json.get('email')
    position = request.json.get('position')
    password = request.json.get('password')

    if not (name and email and position and password):
        return jsonify({ "message": "Error datos", "created": False}), 400
    
    user = User(name=name, email=email, password=password, position_id=position, is_active=True)
    db.session.add(user)
    db.session.commit()

    return jsonify({ "message": "Usuario creado", "created": True}), 200

