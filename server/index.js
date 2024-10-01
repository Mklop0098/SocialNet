const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const notifyRoutes = require("./routes/notify")
const postsRoute = require("./routes/post")
const friendRoutes = require("./routes/friends")
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get("/ping", (_req, res) => {
  return res.json({ msg: "Ping Successful" });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notify", notifyRoutes);
app.use("/api/post", postsRoute);
app.use("/api/friends", friendRoutes);
app.use("/images", express.static('src/images'))

const server = app.listen(process.env.PORT || 5000, () =>
  console.log(`Server started on ${process.env.PORT || 5000}`)
);
const io = socket(server, {
  cors: {
    origin: "https://localhost:5173",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    const id = socket.id
    onlineUsers.set(userId, id);
  });

  socket.on("remove-user", (userId) => {
    onlineUsers.delete(userId);
  });

  socket.on("send-msg", (data) => {
    const toUserSocket = onlineUsers.get(data.to);
    if (toUserSocket) {
      socket.to(toUserSocket).emit("msg-receive", data);
    }
  });

  socket.on("on-typing", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      if (data.state) {
        socket.to(sendUserSocket).emit("typing-render", data);
      }
      else {
        socket.to(sendUserSocket).emit("typing-stop", data);
      }
    }
  })
  
  socket.on("like-post", (data) => {
    const sendUserSocket = onlineUsers.get(data.owner);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("post-liked", data);
    }
  })

  socket.on("comment-post", (data) => {
    const sendUserSocket = onlineUsers.get(data.owner);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("post-commented", data);
    }
  })

});
