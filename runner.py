from chat_server import chat_app

if __name__ =='__main__':
    sio , app = chat_app()
    sio.run(app,debug=True)