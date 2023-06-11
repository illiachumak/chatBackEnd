const container = require("./di");

const cors = container.get("Cors")
const express = container.get("Express");
const app = container.get("Express")();
const server = container.get("Http").Server(app);
const io = container.get("SocketIO")(server, {
  cors: {
    origin: "*",
  },
});
const axios = container.get("Axios");






const update = container.get("update");
const ref = container.get("ref");

const init = container.get("init");
const db = container.get("db");




app.use(express.json());
app.use(cors());

const rooms = new Map();

app.get("/rooms", function (req, res) {
  res.json(Array.from(rooms.keys()));
});

app.get("/rooms/:roomId/messages", function (req, res) {
  const roomId = req.params.roomId;
  const room = rooms.get(roomId);

  if (!room) {
    return res.status(404).json({ message: "Room not found" });
  }

  const messages = room.get("messages");
  res.json(messages);
});

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

app.post("/authenticate", async (req, res) => {
  const { username, roomId } = req.body;

  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ["users", new Map()],
        ["messages", []],
      ])
    );
  }







    const room = rooms.get(roomId);
    const usersMap = room.get("users");
    usersMap.set(username, "offline");
    room.set("users", usersMap);

    const users = Array.from(usersMap.values()).map((status) => ({
      username: username,
      status,
    }));
    

    return res.status(200).json(username);
  
    
});



io.on("connection", (socket) => {
  const user = {
    id: socket.id,
  };
 

  socket.on("USER:SET_USERNAME", (username) => {
    user.username = username;
  });

  socket.on("USER:SET_USERID", (userID) => {
    user.userId = userID 
    

  });

  socket.on("ROOM:JOIN", (roomId) => {
    user.roomId = roomId;
    socket.join(roomId);

    if (!rooms.has(roomId)) {
      rooms.set(
        roomId,
        new Map([
          ["users", new Map()],
          ["messages", []],
        ])
      );
    }
    const room = rooms.get(roomId);
    const usersMap = room.get("users");
    usersMap.set(user.username, "online");
    room.set("users", usersMap);

    const users = Array.from(usersMap.entries()).map(([username, status]) => ({
      username,
      status,
    }));
    io.to(roomId).emit("ROOM:JOINED", users);

    const messages = room.get("messages");

    if (messages.length > 0) {
      messages.forEach((message) => {
        socket.emit("MESSAGE:RECEIVED", message);
      });
    }
  });

  socket.on("MESSAGE:SEND", (message) => {
    const roomId = user.roomId;
    const room = rooms.get(roomId);
    const messages = room.get("messages");
    messages.push(message);
    room.set("messages", messages);
    io.to(roomId).emit("MESSAGE:RECEIVED", message);
  });

  socket.on("disconnect", () => {
    const roomId = user.roomId;

    update(ref(db, 'Users/' + user.userId),{
      login: 'disconnected',
    })

    if (user.username) {
      if (rooms.has(roomId)) {
        const room = rooms.get(roomId);
        const usersMap = room.get("users");
        usersMap.set(user.username, "offline");
        room.set("users", usersMap);

        const users = Array.from(usersMap.entries()).map(([username, status]) => ({
          username,
          status,
        }));
        io.to(roomId).emit("ROOM:JOINED", users);
      }
    }
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
