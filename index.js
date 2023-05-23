const express = require("express");
const cors = require("cors");
const axios = require("axios");


const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: '*',
  }} 
  );

app.use(express.json());
app.use(cors())




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
  const { roomId } = req.body;
  
  try{
    const resp = await axios.put(
        "https://api.chatengine.io/users/",
        {username: username, secret: secret, first_name: username},
        {headers:{"private-key": "af30f057-cd59-4aab-a334-d50b8656b18a"}}
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
        {headers:{"private-key": "af30f057-cd59-4aab-a334-d50b8656b18a"}}
    )
    return res.status(resp.status).json(resp.data)
  } catch(e){
    return res.status(e.response.status).json(e.response.data)
  }

  
});

io.on('connection', socket => {

})


server.listen(3001);
