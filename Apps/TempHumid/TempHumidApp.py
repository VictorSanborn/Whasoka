#!/usr/bin/python
import sys
import Adafruit_DHT as dht
import threading

def printit():
    threading.Timer(5.0, printit).start()
    humidity, temperature = dht.read_retry(11, 4)
    print 'Temp: {0:0.1f} C  Humidity: {1:0.1f} %'.format(temperature, humidity)


printit()