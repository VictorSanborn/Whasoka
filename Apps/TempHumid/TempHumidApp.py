#!/usr/bin/python
import os
import sys
import Adafruit_DHT as dht
import threading
import time
import socketio
from dotenv import load_dotenv
load_dotenv()


sio = socketio.Client()
sendTimer = 5000  # Milisecounds
global myId 
myId = ""  # Recived from socketIO databroker

@sio.event
def connect():
    print('connection established')
    isCon = True


@sio.event
def disconnect():
    print('disconnected from server')
    isCon = False

# Recived from databroker when the server SocketIO detects the units ID
@sio.event
def id(data):
    print("ID: "+data)
    myId = data

# Recived from databroker when a update of time is sent to this client ID (myId)
@sio.event
def timesettings(data):
    print("Update Timer: "+str(data))
    sendTimer = data 

# Base message to be able to speak to databroker. (should be untoutched if you are not sure what is happening)
@sio.event
def my_message(data):
    sio.emit('value', '{"me":"'+os.getenv("MY_NAME")+'", "myKey":"'+str(os.getenv("MY_KEY")) +
             '", "myId":"' + myId + '", "target":"' + os.getenv("TARGET_APP") + '", "value": '+data+'}')
    print("~sent~")


def printit():
    #
    #       THIS IS AN EXAMPLE APP, REPLACE CODE WITHIN WHILE LOOP TO WRITE YOUR OWN! :)
    #
    while True:
        global sendTimer
        print(sendTimer)
        time.sleep(sendTimer/1000)
        humidity, temperature = dht.read_retry(11, 4)
        room = "livingroom"
        
        print(temperature)
        #Data is the value stored in the db. Each key needs to match teh db column name!
        data = '{"room": "'+room+'", "temp": "'+str(temperature)+'", "humid": "'+str(humidity)+'"}'
        my_message(data)




# Basic init of app
#


# Connect to databroaker socket io server
sio.connect(str(os.getenv("SOCKET_IO_ADRESS")))
# Run app
print("STARTING --")
printit()
