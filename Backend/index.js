//Importing packages
const app = require("express")();
const URI = require("./vars.js");
const user = require("./schema.js");
const mongoose = require("mongoose");
const io = require("socket.io");
const server = require("http").server(app);
const io = require("socket.io")(server);

//Variables
const port = process.env.PORT || 3001;

//Web socket
io.on("connection", (socket) => {
  console.log("User connected.");
});

//Db connection
mongoose.connect(URI);

//Json middleware
app.use(express.json());

//Get endpoint
app.get("/", (req, res) => {
  res.status(401).send("REQUEST ERROR: PLEASE ENTER API KEY.");
});

//Create user endpoint
app.post("/api/users/post/create", (req, res) => {
  //create user
  try {
    const newUser = new user({
      id: req.body.id,
      username: req.body.username,
      password: req.body.password,
    });
    newUser.save().then(() => {
      res.status(201).send("Done, no errors and problems.");
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

//Find users endpoint
app.get("/api/users/get/all", (req, res) => {
  //Find all users
  try {
    user
      .find()
      .exec()
      .then((data) => res.status(200).send(data));
  } catch (err) {
    res.status(500).send(err);
  }
});

//Not found error handling
const notFound = (req, res) => {
  res.status(404).send("REQUEST ERROR: The page you requested was not found.");
};
app.use(notFound);

//Listen server on port
app.listen(port, () => {
  console.log(`Server Ready and listening on port ${port}`);
});
