"""
This module takes care of starting the API Server,
Loading the DB and Adding the endpoints
"""

from flask import request, jsonify, Blueprint
from api.models import db, User, Visitado, Favorito, Guardado, Descartado
from flask_cors import CORS
from sqlalchemy import select
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

@api.route('/register', methods=['POST'])
def register():
    email = request.json.get('email')
    password = request.json.get('password')

    if not email or not password:
        return jsonify({"msg": "Email and password required"}), 400

    user = User()
    user.create_user(email, password)

    return jsonify(user.serialize()), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if data is None:
        return jsonify({'msg': 'No JSON data provided'}), 400

    email = data.get('email')
    password = data.get('password')

    user = db.session.execute(
        select(User).where(User.email == email)
    ).scalar_one_or_none()

    if user is None or not user.check_password(password):
        return jsonify({'msg': 'Invalid credentials'}), 401

    access_token = create_access_token(identity=user.email)

    return jsonify({"token": access_token}), 200

@api.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    email = get_jwt_identity()

    user = db.session.execute(
        select(User).where(User.email == email)
    ).scalar_one_or_none()

    if user is None:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({
        "user": user.serialize(),
        "visitados": [v.serialize() for v in user.visitados],
        "favoritos": [f.serialize() for f in user.favoritos],
        "guardados": [g.serialize() for g in user.guardados],
        "descartados": [d.serialize() for d in user.descartados]
    }), 200

@api.route('/visitado', methods=['POST'])
@jwt_required()
def add_visitado():
    email = get_jwt_identity()
    user = db.session.execute(select(User).where(User.email == email)).scalar_one_or_none()

    nombre = request.json.get("nombre")
    tipo = request.json.get("tipo")

    nuevo = Visitado(nombre=nombre, tipo=tipo, user_id=user.id)
    db.session.add(nuevo)
    db.session.commit()

    return jsonify(nuevo.serialize()), 201

@api.route('/visitado/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_visitado(id):
    email = get_jwt_identity()
    user = db.session.execute(select(User).where(User.email == email)).scalar_one_or_none()

    visitado = db.session.execute(
        select(Visitado).where(Visitado.id == id, Visitado.user_id == user.id)
    ).scalar_one_or_none()

    if visitado is None:
        return jsonify({"msg": "Not found"}), 404

    db.session.delete(visitado)
    db.session.commit()
    return jsonify({"msg": "Deleted"}), 200

@api.route('/favorito', methods=['POST'])
@jwt_required()
def add_favorito():
    email = get_jwt_identity()
    user = db.session.execute(select(User).where(User.email == email)).scalar_one_or_none()

    nombre = request.json.get("nombre")
    tipo = request.json.get("tipo")

    nuevo = Favorito(nombre=nombre, tipo=tipo, user_id=user.id)
    db.session.add(nuevo)
    db.session.commit()

    return jsonify(nuevo.serialize()), 201

@api.route('/favorito/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_favorito(id):
    email = get_jwt_identity()
    user = db.session.execute(select(User).where(User.email == email)).scalar_one_or_none()

    favorito = db.session.execute(
        select(Favorito).where(Favorito.id == id, Favorito.user_id == user.id)
    ).scalar_one_or_none()

    if favorito is None:
        return jsonify({"msg": "Not found"}), 404

    db.session.delete(favorito)
    db.session.commit()
    return jsonify({"msg": "Deleted"}), 200

@api.route('/guardado', methods=['POST'])
@jwt_required()
def add_guardado():
    email = get_jwt_identity()
    user = db.session.execute(select(User).where(User.email == email)).scalar_one_or_none()

    nombre = request.json.get("nombre")
    tipo = request.json.get("tipo")

    nuevo = Guardado(nombre=nombre, tipo=tipo, user_id=user.id)
    db.session.add(nuevo)
    db.session.commit()

    return jsonify(nuevo.serialize()), 201

@api.route('/guardado/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_guardado(id):
    email = get_jwt_identity()
    user = db.session.execute(select(User).where(User.email == email)).scalar_one_or_none()

    guardado = db.session.execute(
        select(Guardado).where(Guardado.id == id, Guardado.user_id == user.id)
    ).scalar_one_or_none()

    if guardado is None:
        return jsonify({"msg": "Not found"}), 404

    db.session.delete(guardado)
    db.session.commit()
    return jsonify({"msg": "Deleted"}), 200

@api.route('/descartado', methods=['POST'])
@jwt_required()
def add_descartado():
    email = get_jwt_identity()
    user = db.session.execute(select(User).where(User.email == email)).scalar_one_or_none()

    nombre = request.json.get("nombre")
    tipo = request.json.get("tipo")

    nuevo = Descartado(nombre=nombre, tipo=tipo, user_id=user.id)
    db.session.add(nuevo)
    db.session.commit()

    return jsonify(nuevo.serialize()), 201

@api.route('/descartado/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_descartado(id):
    email = get_jwt_identity()
    user = db.session.execute(select(User).where(User.email == email)).scalar_one_or_none()

    descartado = db.session.execute(
        select(Descartado).where(Descartado.id == id, Descartado.user_id == user.id)
    ).scalar_one_or_none()

    if descartado is None:
        return jsonify({"msg": "Not found"}), 404

    db.session.delete(descartado)
    db.session.commit()
    return jsonify({"msg": "Deleted"}), 200