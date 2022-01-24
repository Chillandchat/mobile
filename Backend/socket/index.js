const mongoose = require("mongoose");
const message = require("./messageSchema.js");
const dotenv = require("dotenv");
const io = require("socket.io")(3001, {});

dotenv.config();
mongoose.connect(process.env.URI);

io.on("connection", (socket) => {
  socket.on("message", (payload) => {
    /**
     * This event will emit a message to all connected listeners on the network.
     *
     * @param {string} id The message id.
     * @param {string} user The message's sender name.
     * @param {string} content The message's content or what it says.
     * @param {boolean} verified If the message's sender is verified or not.
     *
     * Please put all the following content in the payload like the following:
     * @example socket.emit("message", {id: "abcdefg123456789", user:"John Smith", content:"Hi there!", verified: true})
     */

    io.emit("message", payload);
    try {
      const newMessage = new message({
        id: payload.id,
        user: payload.user,
        content: payload.content,
        verified: payload.verified,
      });
      newMessage.save().then(() => {});
    } catch (err) {
      console.log(err);
    }
  });
});

io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
