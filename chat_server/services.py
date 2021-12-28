from flask_socketio import SocketIO,join_room, leave_room

sio = SocketIO()

@sio.on('connect')
def new_connection(*args):
    print(f'new client joined {args} ')

@sio.on('message')
def message(message):
    code = message.get('code' or None)
    if code:
        print(message)
        sio.emit('message',message,room=code)
    
@sio.on('disconnect')
def disconnected(*args):
    print(f'disconnected {args}')

@sio.on('join-room')
def on_join_room(data):
    room_code = data.get('code' or None)
    username = data.get('sender' or None)
    if room_code:
        join_room(room_code)
        sio.emit('message',
        {'sender':'server','code':room_code,'text':f'{username} welcome to the room: {room_code}'},
        room=room_code,
        include_self=False) 
    else:
        sio.emit('message',{'sender':'server','code':'failed','text':'failed to join the room'},room=room_code)

@sio.on('leave_room')
def on_leave_room(data):
    room_code = data.get('code' or None)
    sender = data.get('sender' or None)
    if room_code:
        sio.emit('message',{'sender':'server','code':room_code,'text':f'{sender} left  to the room'},room=room_code)
        print('leaving the room')
        leave_room(room_code) 
    else:
        sio.emit('message',{'sender':'server','code':'failed','text':'failed to leave the room'},room=room_code)
     
