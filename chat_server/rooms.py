from flask import Blueprint,jsonify,request
from .models import User, Room
from . import  db

room = Blueprint('room',__name__)

@room.route('/create-room',methods=['POST'])
def create_room():
    if request.method =='POST':
        room  = Room()
        db.session.add(room)
        db.session.commit()
        return jsonify({'status':'info','response':f'join with code : {room.room_code}'})
        
@room.route('/join-room',methods=['POST'])
def join_room():
    if request.method =='POST':
        code = request.json.get('code')
        username= request.json.get('username')
        room = Room.query.filter_by(room_code = code).first()
        if not room:
            return jsonify({'status':'error','response':"code dont-exits"})
        else:
            joinee = User.query.filter_by(username=username,room_code=code).first()
            if joinee:
                return jsonify({'status':'warning','response':'name already exists try using someting else'})
            else:
                joinee = User(username=username,room_code = code)
                db.session.add(joinee)
                db.session.commit()
                return jsonify({'status':'success','response':'welcome to the room'})

@room.route('/delete-joinee',methods=['DELETE'])
def delete_joinee():
    if request.method =='DELETE':
        username = request.json.get('username')
        room_code = request.json.get('room_code')
        print(username,room_code)
        joinee = User.query.filter_by(username=username,room_code = room_code).first()
        if not joinee:
            return jsonify({'status':'error','response':'joinee-dont exists'})
        else:
            db.session.delete(joinee)
            db.session.commit()
            return jsonify({'status':'success','response':'joinee removed'})
