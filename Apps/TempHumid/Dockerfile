FROM python

RUN apt-get update && apt-get install -y
RUN apt-get install python3-pip -y
RUN apt-get install python3-requests -y
#RUN apt-get python3 -m pip install --upgrade pip setuptools wheel -y

RUN pip3 install requests --upgrade
RUN pip3 install Adafruit_DHT
RUN pip3 install python-socketio
RUN pip3 install environs 

COPY ./TempHumidApp.py ./
WORKDIR ./

CMD python3 TempHumidApp.py

