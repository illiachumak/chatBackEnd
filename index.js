const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

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
  const { username, secret, roomId } = req.body;

  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ["users", new Map()],
        ["messages", []],
      ])
    );
  }

  try {
    const resp = await axios.put(
      "https://api.chatengine.io/users/",
      { username, secret, first_name: username },
      { headers: { "private-key": "af30f057-cd59-4aab-a334-d50b8656b18a" } }
    );

    const room = rooms.get(roomId);
    const usersMap = room.get("users");
    usersMap.set(resp.data.username, "offline");
    room.set("users", usersMap);

    const users = Array.from(usersMap.values()).map((status) => ({
      username: resp.data.username,
      status,
    }));
    io.to(roomId).emit("ROOM:JOINED", users);

    return res.status(resp.status).json(resp.data);
  } catch (e) {
    if (e.response) {
      return res.status(e.response.status).json(e.response.data);
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
});



io.on("connection", (socket) => {
  const user = {
    id: socket.id,
  };

  socket.on("USER:SET_USERNAME", (username) => {
    user.username = username;
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
