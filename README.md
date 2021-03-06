![alt text](./Readme_Assets/header.png)

-- Well, a Home Automation System that is Open Source... Okay! --

## Info

![alt text](./Readme_Assets/divider.png)

An OpenSource project that allows you to combine applications and/or add your own apps to be used.
The system can be used both as a closed environment only accessible from your home network or as an open environment where you can control your home from anywhere.

To be used as an open system you need to host the database and GraphQL-API on a server accessible from the internet.

The central hub/heart of the system is Socket.IO where all data is sent to and from there stored or sent to the client in need of the data.
The majority of data processed is intended to be data consumed of the information systems that contain mobile applications, web interface and/or a data display.

The idea is to create a base for other applications to be built around Whasoka. Build a plant monitoring application that shows the statistics or send the data directly to a watering system that you have built with an arduino? Or why not add a module that based on time sends signals that control the strength of your led stripes?

If you choose to add an external data storage you will be able to build applications with geofencing that would allow light sources to be turned on/off depending where you are. Or manually control it from a mobile app.

The possibilities is endless!

![alt text](./Readme_Assets/data_diagram.png)

As shown in the above picture, the "Data Senders" is module examples and some upcoming sections of work. Also the "Data Management / Display" Is currently not built.

## Data Structure

![alt text](./Readme_Assets/divider.png)

### Message within Databroker

    [JSON]
    {
        socket: [socket.io-client],
        me: [string],
        myId: [socket-id],
        myKey: [string],
        target: [string],
    }

    me: name of the unit, set by the user. Ex: "TempLivingroom"
    myId: is set by data broker when the unit connects
    myKey: password set in data broker. gives some kind of security...
    target: name of the target application. Ex TempMessurmentApp, is used to save data to DB

### Docker support!

    The projects can be hosted with docker for your simplicity. Simply use the bash files within the /scripts folder within each project. Run the dockerBuild.sh with the project loaded to your machine (ex. RPi). Then run the script runDoocker.sh to start it.

    To see if it runs use:
        (sudo) docker ps
    and all running containers will be shown.

    Note that teh build- / runDocker.sh might need to be made exicutable. To do this run the command:
        chmod +x buildDocker.sh
        chmod +x runDocker.sh

    To kill a running container use:
        (sudo) docker ps
    note the three firs values in the CONTAINER ID you want to kill
    then run:
        (sudo) docker kill xxx
    where xxx is the first three in CONTAINER ID

### .env File (Required)

    Create a .env file in the bellow listed folders with the following values (or change them to your liking)

#### Databroker

    SOCKET_IO_PORT=4001
    SOCKET_IO_ADRESS=http://localhost:4001
    GRAPHQL_ADRESS=http://localhost:9001
    MY_KEY=sUpErS4f3_No0t

    //USED FOR TEST NOT NEEDED
    MY_NAME=BedRoomTemp
    TARGET_APP=TempHumidApp

#### GraphQL_API

    OBS! The runDocker.sh file needs to be updated with the correct --env variabels before being used.

    USER=doadmin
    PASSWORD=PASSWORD_FROM_DIGITALOCEAN
    HOST=IM_USING_DIGITALOCEAN_GET_YOUR_POSTGRESDB_THERE_TO_IF_YOU_WHANT!
    PORT=25060
    DATABASE=WHASOKA

#### Apps/TempHumid

    SOCKET_IO_PORT=4001
    SOCKET_IO_ADRESS=http://localhost:4001
    MY_KEY=sUpErS4f3_No0t
    MY_NAME=BedRoomTemp
    TARGET_APP=SimpleTempApp
