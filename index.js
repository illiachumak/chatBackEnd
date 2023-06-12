const container = require("./di");

const cors = container.get("Cors");
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

const rooms = [];

app.get("/rooms", function (req, res) {
  res.json(rooms.map((room) => room.roomId));
});

app.get("/rooms/:roomId/messages", function (req, res) {
  const roomId = req.params.roomId;
  const room = rooms.find((room) => room.roomId === roomId);

  if (!room) {
    return res.status(404).json({ message: "Room not found" });
  }

  const messages = room.messages;
  res.json(messages);
});

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

app.post("/authenticate", async (req, res) => {
  const { username, roomId } = req.body;

  let room = rooms.find((room) => room.roomId === roomId);
  if (!room) {
    room = {
      roomId,
      users: {},
      messages: [],
    };
    rooms.push(room);
  }

  const userList = Object.values(room.users);

  return res.status(200).json(userList);
});


io.on("connection", (socket) => {
  const user = {
    id: socket.id,
  };

  socket.on("USER:SET_USERNAME", (username) => {
    user.username = username;
  });

  socket.on("USER:SET_USERID", (userID) => {
    user.userId = userID;
  });

  socket.on("ROOM:JOIN", async (roomId, photoURL) => {
    user.roomId = roomId;
    socket.join(roomId);
  
    let room = rooms.find((room) => room.roomId === roomId);
    if (!room) {
      room = {
        roomId,
        users: {},
        messages: [],
      };
      rooms.push(room);
    }
  
    const users = room.users;
    users[user.userId] = {
      username: user.username,
      status: "online",
      photoURL: photoURL,
    };
  
    room.users = users;
  
    const userList = Object.entries(users).map(([userId, userInfo]) => ({
      userId,
      username: userInfo.username,
      status: userInfo.status,
      photoURL: userInfo.photoURL,
    }));
  
    io.to(roomId).emit("ROOM:JOINED", userList);
  
    const messages = room.messages;
  
    if (messages.length > 0) {
      messages.forEach((message) => {
        socket.emit("MESSAGE:RECEIVED", message);
      });
    }
  });
  

    

   
  socket.on("MESSAGE:SEND", (message) => {
    const roomId = user.roomId;
    const room = rooms.find((room) => room.roomId === roomId);

    if (room) {
      const { username, photoURL } = room.users[user.userId];
      const messageWithPhotoURL = {
        ...message,
        username,
        photoURL,
      };

      const messages = room.messages;
      messages.push(messageWithPhotoURL);
      room.messages = messages;
      io.to(roomId).emit("MESSAGE:RECEIVED", messageWithPhotoURL);
    }
  });

  socket.on("disconnect", () => {
    const roomId = user.roomId;

    update(ref(db, "Users/" + user.userId), {
      login: "disconnected",
    });

    if (user.username) {
      const room = rooms.find((room) => room.roomId === roomId);

      if (room) {
        const users = room.users;
        users[user.userId].status = "offline";
        room.users = users;

        const userList = Object.entries(users).map(([userId, userInfo]) => ({
          userId,
          username: userInfo.username,
          status: userInfo.status,
          photoURL: userInfo.photoURL,
        }));

        io.to(roomId).emit("ROOM:JOINED", userList);
      }
    }
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
