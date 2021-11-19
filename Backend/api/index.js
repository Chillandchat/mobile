//Importing packages
require("dotenv").config();
const app = require("express")();
const express = require("express");
const user = require("./authSchema.js");
const mongoose = require("mongoose");
const message = require("./messageSchema.js");
const cors = require("cors");

//Variables
const port = process.env.PORT || "8080";

//Db connection
mongoose.connect(process.env.URI);

//Json middleware
app.use(express.json());

//CORS middleware
app.use(cors());

//Get endpoint
app.get("/", (req, res) => {
  res.status(401).send("REQUEST ERROR: PLEASE ENTER API KEY.");
});

//Get all message endpoint
app.get("/api/messages/get", (req, res) => {
  try {
    message
      .find()
      .exec()
      .then((data) => res.status(200).send(data));
  } catch (err) {
    res.status(500).send(`SERVER ERROR: ${err}`);
  }
});

//Create user endpoint
app.post("/api/users/post/create", (req, res) => {
  try {
    const newUser = new user({
      id: req.body.id,
      username: req.body.username,
      password: req.body.password,
      blocked: req.body.blocked,
      onDeleteList: req.body.onDeleteList,
    });
    newUser.save().then(() => {
      res.status(201).send("Saved successfully, no errors and problems.");
    });
  } catch (err) {
    res.status(500).send(`SERVER ERROR: ${err}`);
  }
});

//Find all users endpoint
app.get("/api/users/get/all", (req, res) => {
  try {
    user
      .find()
      .exec()
      .then((data) => res.status(200).send(data));
  } catch (err) {
    res.status(500).send(`SERVER ERROR: ${err}`);
  }
});

//Login endpoint
app.get("/api/users/get/:user/:password", (req, res) => {
  try {
    user
      .findOne({ username: req.params.user })
      .exec()
      .then((data) => {
        if (data != null || data != undefined) {
          if (
            data.username == req.params.user &&
            data.password == req.params.password
          )
            res.status(200).send("User login success");
          else res.status(400).send("Invalid password");
        } else res.status(404).send("User not found");
      })
      .catch((err) => {
        res.status(500).send(`SERVER ERROR: ${err}`);
      });
  } catch (err) {
    res.status(500).send(`SERVER ERROR: ${err}`);
  }
});

//Find user endpoint
app.get("/api/users/get/:user/", (req, res) => {
  try {
    user
      .findOne({ username: req.params.user })
      .exec()
      .then((data) => {
        if (data != null || data != undefined) res.status(200).send();
        else res.status(404).send("User not found");
      })
      .catch((err) => {
        res.status(500).send(`SERVER ERROR: ${err}`);
      });
  } catch (err) {
    res.status(500).send(`SERVER ERROR: ${err}`);
  }
});

//Block user endpoint
app.put("/api/users/block/", (req, res) => {
  let error = false;
  user
    .findOneAndUpdate({ username: req.body.user })
    .exec()
    .then((data) => {
      if (data != null || data != undefined) {
        try {
          data.blocked = req.body.blockedStatus;
          data.save();
        } catch (err) {
          res.status(500).send(`SERVER ERROR: ${err}`);
          error = true;
        }
      } else res.status(404).send("User not found");
      if (!error) res.status(200).send();
      error = false;
    });
});

//Not found error handling
const notFound = (req, res) => {
  res
    .status(404)
    .send(
      "REQUEST ERROR: The page you requested was not found, please type a valid URL."
    );
};
app.use(notFound);

//Listen server on port
app.listen(port, () => {
  console.log(`Server Ready and listening on port ${port}`);
});
