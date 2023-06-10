const { Container } = require("inversify");
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, update } = require("firebase/database");

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const http = require("http");
const socketIO = require("socket.io");

const firebaseConfig = {
    apiKey: "AIzaSyBkTOrTblEMljuWYGB4kmm93M3c-rfvkd8",
    authDomain: "persprojauth555.firebaseapp.com",
    databaseURL: "https://persprojauth555-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "persprojauth555",
    storageBucket: "persprojauth555.appspot.com",
    messagingSenderId: "861020334162",
    appId: "1:861020334162:web:9697c67eff12d7a34f978b",
    measurementId: "G-KSY7V626QR"
  };

const container = new Container();
container.bind("firebaseConfig").toConstantValue(firebaseConfig);
container.bind("update").toConstantValue(update);
container.bind("ref").toConstantValue(ref);
container.bind("init").toConstantValue(initializeApp(container.get("firebaseConfig")));
container.bind("db").toConstantValue(getDatabase(container.get("init")));
container.bind("Express").toConstantValue(express);
container.bind("Cors").toConstantValue(cors);
container.bind("Axios").toConstantValue(axios);
container.bind("Http").toConstantValue(http);
container.bind("SocketIO").toConstantValue(socketIO);

module.exports = container;
