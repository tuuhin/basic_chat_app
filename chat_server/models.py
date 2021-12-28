from . import db
import random
from datetime import datetime


def get_random_chr():
    return chr(random.randrange(97,122))

def create_room_code():
    while True:
        code = f'{get_random_chr()}{get_random_chr()}{get_random_chr()}'
        if code!=Room.query.filter_by(room_code=code).first():
            break
    return code


class Room(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    room_code = db.Column(db.String,default=create_room_code)
    created_at = db.Column(db.DateTime,default=datetime.now)
    user = db.relationship('User',backref='room')

class User(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String(255),nullable=False)
    room_code = db.Column(db.String,db.ForeignKey('room.room_code'),nullable=False)
