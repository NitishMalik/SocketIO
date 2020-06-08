const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const axios = require("axios");

const port = process.env.PORT || 4001;
const app = express();

const index = require("./routes/index");
app.use(index);

const server = http.createServer(app);
const io = socketIO(server);

let interval;
let connectionCounter = 0;

io.on("connection", (socket) => {
  console.log("New User connected");
  console.log(connectionCounter++);
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => getApiAndEmit(socket), 5000);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

let temp = 10;

const getApiAndEmit = async (socket) => {
  try {
    // const res = await axios.get(
    //   "https://api.openweathermap.org/data/2.5/onecall?lat={30.73}&lon={76.77}&exclude={hourly}&appid={8a3f8b2cf1ab4856ed9f7b5fa59b616b}"
    // );
    const temp1 = {
      temp: temp++,
      feelsLike: temp++ + 5,
      name: "Chandigarh",
    };
    console.log(temp1);
    socket.broadcast.emit("FromAPI", temp1);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

server.listen(port, () => console.log(`Listening on port ${port}`));
