const { Container } = require("inversify");
const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const http = require("http");
const socketIO = require("socket.io");


const container = new Container();


container.bind("FirebaseApp").toConstantValue(initializeApp(firebaseConfig));
container.bind("FirebaseDatabase").toConstantValue(getDatabase(container.get("FirebaseApp")));
container.bind("Express").toConstantValue(express);
container.bind("Cors").toConstantValue(cors);
container.bind("Axios").toConstantValue(axios);
container.bind("Http").toConstantValue(http);
container.bind("SocketIO").toConstantValue(socketIO);

module.exports = container;
