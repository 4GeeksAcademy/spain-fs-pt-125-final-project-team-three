"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select
from flask_jwt_extended import create_access_token

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('register', methods=['POST'])
def register ():
    email= request.json.get('email')
    password=  request.json.get('password')

    user = User()
    user.create_user(email,password)
    return jsonify(user.serialize()), 201

@api.route('/login', methods=['POST'])
def login():
    email = request,json.get('email')
    password = request.json.get('password')
    user = db.session.execute(select(User).where(
        User.email == email)).scalar_one_or_none()

    access_token=create_access_token(identity=user.id)

    return jsonify({"token": access_token}), 201
