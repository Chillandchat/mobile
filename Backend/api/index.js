//Importing packages
const app = require("express")();
const express = require("express");
const user = require("./authSchema.js");
const mongoose = require("mongoose");
const message = require("./messageSchema.js");
const cors = require("cors");
const dotenv = require("dotenv");

//Setup dotenv
dotenv.config();

//Variables
const port = process.env.PORT || "8080";

//Db connection
mongoose.connect(process.env.URI);

//Json middleware
app.use(express.json());

//CORS middleware
app.use(
  cors({
    origin: "https://chill-and-chat-web.web.app/",
  })
);

//Get endpoint
app.get("/", (req, res) => {
  res.status(401).send("REQUEST ERROR: PLEASE ENTER API KEY.");
});

//Get all message endpoint
app.get("/api/get_all_message", (req, res) => {
  try {
    //Search database
    message
      .find()
      .exec()
      .then((data) => res.status(200).send(data));
  } catch (err) {
    //Throw error
    res.status(500).send(`SERVER ERROR: ${err}`);
  }
});

//Create user endpoint
app.post("/api/sign_up", (req, res) => {
  try {
    //Create user element
    const newUser = new user({
      id: req.body.id,
      username: req.body.username,
      password: req.body.password,
      verified: req.body.verified,
      bot: req.body.bot,
      blocked: req.body.blocked,
    });
    //Save database
    newUser.save().then(() => {
      res.status(201).send("Saved successfully, no errors and problems.");
    });
  } catch (err) {
    //Throw error
    res.status(500).send(`SERVER ERROR: ${err}`);
  }
});

//Find all users endpoint
app.get("/api/get_all_users", (req, res) => {
  try {
    //Search database
    user
      .find()
      .exec()
      .then((data) => res.status(200).send(data));
  } catch (err) {
    //Throw error
    res.status(500).send(`SERVER ERROR: ${err}`);
  }
});

//Login endpoint
app.post("/api/login", (req, res) => {
  try {
    //Search database
    user
      .findOne({ username: req.body.user })
      .exec()
      .then((data) => {
        //Check if user exists
        if (data != null && data != undefined) {
          //Check password
          if (
            data.username == req.body.user &&
            data.password == req.body.password
          )
            /*Handle conditions:*/ res.status(200).send("User login success");
          else res.status(400).send("Invalid password");
        } else res.status(404).send("User not found");
      })
      .catch((err) => {
        //Throw error
        res.status(500).send(`SERVER ERROR: ${err}`);
      });
  } catch (err) {
    //Throw error
    res.status(500).send(`SERVER ERROR: ${err}`);
  }
});

//Find user endpoint
app.get("/api/get_user/:user/", (req, res) => {
  try {
    //Find user
    user
      .findOne({ username: req.params.user })
      .exec()
      .then((data) => {
        //Check conditions
        if (data != null || data != undefined) res.status(200).send(data);
        /*Throw error:*/ else res.status(404).send("User not found");
      })
      .catch((err) => {
        //Throw error
        res.status(500).send(`SERVER ERROR: ${err}`);
      });
  } catch (err) {
    //Throw error
    res.status(500).send(`SERVER ERROR: ${err}`);
  }
});
app.post("/api/report_user", (req, res) => {
  //Email ok
  let emailOk = false;

  //Error message
  let error;

  //Transporter
  let transporter = nodemailer.createTransport({
    service: "icloud",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  //Mail options
  let mailOptions = {
    from: "alvincheng88@icloud.com",
    to: "briannacheng@icloud.com",
    subject: "You have a new report from the Chill&chat server",
    text: `${req.body.user} has reported ${req.body.reportUser} for "${req.body.reason}"\n`,
  };

  //Send mail
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) error = err;
    else emailOk = true;
  });

  //Send status
  if (emailOk) res.status(200).send();
  else res.status(500).send(`SERVER ERROR: ${error}`);
});
//Block user endpoint
app.put("/api/block_user", (req, res) => {
  //Error variable
  let error = false;
  //Find and update user
  user
    .findOneAndUpdate({ username: req.body.user })
    .exec()
    .then((data) => {
      //Check conditions
      if (data != null || data != undefined) {
        try {
          //Change data
          data.blocked = req.body.blockedStatus;
          data.save();
        } catch (err) {
          //Throw error
          error = true;
        }
      } /*Throw error:*/ else res.status(404).send("User not found");
      if (!error) /*Check conditions:*/ res.status(200).send();
      //Reset status
      error = false;
    });
});

//Not found error handling
const notFound = (req, res) => {
  //Throw error
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
