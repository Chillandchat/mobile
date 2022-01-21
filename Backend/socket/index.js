// Importing packages
const mongoose = require("mongoose");
const message = require("./messageSchema.js");
const dotenv = require("dotenv");
const io = require("socket.io")(3001, {});

// Setup dotenv
dotenv.config();

// Db connection
mongoose.connect(process.env.URI);

// Web socket
io.on("connection", (socket) => {
  // Event listener
  socket.on("message", (payload) => {
    // Emit message
    io.emit("message", payload);

    // Save message
    try {
      const newMessage = new message({
        id: payload.id,
        user: payload.user,
        content: payload.content,
        verified: payload.verified,
      });
      newMessage.save().then(() => {});
    } catch (err) {
      // Handle error
      console.log(err);
    }
  });
});

// Handle error
io.on("connect_error", (err) => {
  // Print to console
  console.log(`connect_error due to ${err.message}`);
});
