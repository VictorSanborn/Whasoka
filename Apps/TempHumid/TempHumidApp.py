#!/usr/bin/python
import os
import sys
#import Adafruit_DHT as dht
import threading
import socketio
from dotenv import load_dotenv
load_dotenv()


sio = socketio.Client()


@sio.event
def connect():
    print('connection established')


@sio.event
def my_message(data):
    print('message received with ')
    sio.emit(
            'value', '{"me":"test", "myKey": "","myId": "", target: ""}')


@sio.event
def disconnect():
    print('disconnected from server')


def printit():
    threading.Timer(5.0, printit).start()
   # humidity, temperature = dht.read_retry(11, 4)
    #my_message('Temp: {0:0.1f} C  Humidity: {1:0.1f} %'.format(temperature, humidity))
    my_message('Hi from rpi!')

printit()
sio.connect('http://192.168.1.101:4001')
sio.wait()

