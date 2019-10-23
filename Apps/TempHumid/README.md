![alt text](../../Readme_Assets/header.png)

# Run code

![alt text](../../Readme_Assets/divider.png)

## Req:

    git clone https://github.com/VictorSanborn/Whasoka.git
    cd Whasoka/Apps/TempHumid

    .env file:
    SOCKET_IO_ADRESS=http://192.168.1.101:4001 (example of local ip of databroker (socketIO server))
    MY_KEY=sUpErS4f3_No0t
    MY_NAME=BedRoomTemp
    TARGET_APP=TempHumidApp

### Python 3:

#### Lazy style (one line to run it all!) <3

    run:
    chmod +x install.sh
    ./install.sh

#### Manualy

    sudo apt-get update
    sudo apt-get install python3-pip
    sudo python3 -m pip install --upgrade pip setuptools wheel

    sudo pip3 install Adafruit_DHT
    sudo pip3 install python-socketio
    sudo pip3 install python-dotenv
