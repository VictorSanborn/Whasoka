# Whasoka

-- Well, a Home Automation System that is Open Source... Okay! --

## Info

An OpenSource project that allows you to combine applications and/or add your own apps to be used.
The system can be used both as an cloesd enviroment only accessable from your home network or as an open enviromet where you can controll your home from anywhere.

To be used as an open system you need to host the database and GraphQL-API on a server accassable from the internet.

## Data Structure

### Message within Databroaker

    [JSON]
    {
        socket: [socket.io-client],
        me: [string],
        myId: [socket-id],
        myKey: [string],
        target: [string],
    }

    me: name of unit, set by user. Ex: "TempLivingroom"
    myId: is set by databroaker when the unit connects
    myKey: password set in databoraker. gives some kind of security...
    target: name of target application. Ex TempMessurmentApp, is used to save data to db
