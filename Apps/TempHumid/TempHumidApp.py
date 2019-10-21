#!/usr/bin/python
import sys
#import Adafruit_DHT as dht
import threading
import socketio
from environs import Env

env = Env()
env.read_env()  # read .env file, if it exists, Else read main README.md File!
sio = socketio.Client()


@sio.event
def connect():
    print('connection established')


@sio.event
def my_message(data):
    print('message received with ', data)
    sio.emit(
        'value', {'response': '{room: \'livingroom\', temp: \'19.2\', humid: \'22\'}'})


@sio.event
def disconnect():
    print('disconnected from server')


def printit():
    threading.Timer(5.0, printit).start()
   # humidity, temperature = dht.read_retry(11, 4)
    #my_message('Temp: {0:0.1f} C  Humidity: {1:0.1f} %'.format(temperature, humidity))
    my_message('hej')


sio.connect(env("SOCKET_IO_ADRESS"))
sio.wait()
printit()
