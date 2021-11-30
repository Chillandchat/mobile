//Importing packages
const mongoose = require("mongoose");
const message = require("./messageSchema.js");
const URI = require("./vars.js");
const io = require("socket.io")(3001, {
  cors: {
    origin: "https://chill-and-chat-web.web.app",
  },
});

//Db connection
mongoose.connect(URI);

//Web socket
io.on("connection", (socket) => {
  //Event listener
  socket.on("message", (payload) => {
    //Emit message
    io.emit("message", payload);

    //Save message
    try {
      const newMessage = new message({
        id: payload.id,
        user: payload.user,
        content: payload.content,
        verified: payload.verified,
      });
      newMessage.save().then(() => {});
    } catch (err) {
      //Handle error
      console.log(err);
    }
  });
});

//Handle error
io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
