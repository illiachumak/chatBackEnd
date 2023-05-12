const express = require("express");
const cors = require("cors");
const axios = require("axios");


const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server);

app.use(express.json());
app.use(cors({ origin: true }));



const rooms = new Map();

app.get('/rooms', function(req, res){
  rooms.set()
  res.json(rooms);
});

app.get('/', (req, res) => {
  res.json({
    message: "Hello World!"
  });
});

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  const { secret } = req.body;
  
  try{
    const resp = await axios.put(
        "https://api.chatengine.io/users/",
        {username: username, secret: secret, first_name: username},
        {headers:{"private-key": "867d832c-a3fe-428d-9cd7-8941bb86760b"}}
    )
    return res.status(resp.status).json(resp.data)
  } catch(e){
    return res.status(e.response.status).json(e.response.data)
  }

  
});

app.post("/register", async (req, res) => {
  const { username } = req.body;
  const { secret } = req.body;
  
  try{
    const resp = await axios.put(
        "https://api.chatengine.io/users/",
        {username: username, secret: secret, first_name: username},
        {headers:{"private-key": "867d832c-a3fe-428d-9cd7-8941bb86760b"}}
    )
    return res.status(resp.status).json(resp.data)
  } catch(e){
    return res.status(e.response.status).json(e.response.data)
  }

  
});

io.on('connection', socket => {

})

server.listen(3001);
