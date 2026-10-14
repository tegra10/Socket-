"use strict";
const express = require("express");
const app = express();

const http = require("http").Server(app);
const port = 3000;
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("A user is connected");
  socket.on("disconnect", () => {
    console.log("a user is disconneted");
  });

  socket.on("chat message", (msg) => {
    console.log("message reçu " + msg);
    io.emit("chat message", msg);
  });
});

http.listen(port, () => {
  console.log(`listen on port http://localhost:${port}`);
});
