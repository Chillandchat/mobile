//Importing packages
import express from "express";
import user from "./authSchema";
import message from "./messageSchema";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

//Setup dotenv
dotenv.config();

//Setup express
const app: any = express();

//Variables
const port: string | number = process.env.PORT || "8080";

//Db connection
mongoose.connect(process.env.API_URI);

//Json middleware
app.use(express.json());

//CORS middleware
app.use(
  cors({
    origin: ["https://chill-and-chat-web.web.app", "http://localhost:3000/"],
  })
);

//Get endpoint
app.get("/", (req: any, res: any): void => {
  res.status(401).send("REQUEST ERROR: PLEASE ENTER API KEY.");
});

//Get all message endpoint
app.get("/api/get_all_message", (req: any, res: any): void => {
  try {
    //Search database
    message
      .find()
      .exec()
      .then((data: any): void => res.status(200).send(data));
  } catch (err) {
    //Throw error
    res.status(500).send(`SERVER ERROR: ${err}`);
  }
});

//Update message like count
// app.put("/api/update_like_count", (req, res) => {
//   try {
//     message.findOneAndUpdate({ id: req.body.id }, { likes: req.body.likes });
//   } catch (err) {
//     res.status(500).send(`SERVER ERROR: ${err}`);
//   }
// });

//Create user endpoint
app.post("/api/sign_up", (req: any, res: any): void => {
  try {
    //Create user element
    const newUser: any = new user({
      id: req.body.id,
      username: req.body.username,
      password: req.body.password,
      verified: req.body.verified,
      bot: req.body.bot,
      blocked: req.body.blocked,
    });
    //Save database
    newUser.save().then((): void => {
      res.status(201).send("Saved successfully, no errors and problems.");
    });
  } catch (err) {
    //Throw error
    res.status(500).send(`SERVER ERROR: ${err}`);
  }
});

//Find all users endpoint
app.get("/api/get_all_users", (req: any, res: any): void => {
  try {
    //Search database
    user
      .find()
      .exec()
      .then((data: any): void => res.status(200).send(data));
  } catch (err) {
    //Throw error
    res.status(500).send(`SERVER ERROR: ${err}`);
  }
});

//Login endpoint
app.post("/api/login", (req: any, res: any): void => {
  try {
    //Search database
    user
      .findOne({ username: req.body.user })
      .exec()
      .then((data: any): void => {
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
      .catch((err: any): void => {
        //Throw error
        res.status(500).send(`SERVER ERROR: ${err}`);
      });
  } catch (err) {
    //Throw error
    res.status(500).send(`SERVER ERROR: ${err}`);
  }
});

//Find user endpoint
app.get("/api/get_user/:user/", (req: any, res: any): void => {
  try {
    //Find user
    user
      .findOne({ username: req.params.user })
      .exec()
      .then((data: any): void => {
        //Check conditions
        if (data != null || data != undefined) res.status(200).send(data);
        /*Throw error:*/ else res.status(404).send("User not found");
      })
      .catch((err: any): void => {
        //Throw error
        res.status(500).send(`SERVER ERROR: ${err}`);
      });
  } catch (err) {
    //Throw error
    res.status(500).send(`SERVER ERROR: ${err}`);
  }
});
app.post("/api/report_user", (req: any, res: any): void => {
  //Email ok
  let emailOk: boolean = false;

  //Error message
  let error: string;

  //Transporter
  const transporter: any = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.API_EMAIL,
      pass: process.env.API_EMAIL_PASS,
    },
  });

  //Mail options
  const mailOptions: any = {
    from: process.env.API_EMAIL,
    to: "chengalvin333@gmail.com",
    subject: "You have a new report from the Chill&chat server",
    text: `${req.body.user} has reported ${req.body.reportUser}'s message.\nMessage: "${req.body.reason}"\n`,
  };

  //Send mail
  transporter.sendMail(mailOptions, (err: any, data: any): void => {
    //Check errors
    if (err) {
      error = err;
      emailOk = false;
    } else emailOk = true;
  });

  //Send status
  if (emailOk) res.status(200).send();
  else res.status(500).send(`SERVER ERROR: ${error}`);
});

//Block user endpoint
app.put("/api/block_user", (req: any, res: any): void => {
  //Error variable
  let error: boolean = false;

  //Find and update user
  user
    .findOneAndUpdate({ username: req.body.user })
    .exec()
    .then((data: any): void => {
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
const notFound = (req: any, res: any): void => {
  //Throw error
  res
    .status(404)
    .send(
      "REQUEST ERROR: The page you requested was not found, please type a valid URL."
    );
};
app.use(notFound);

//Listen server on port
app.listen(port, (): void => {
  console.log(`Server Ready and listening on port ${port}.\nPress CTRL + C to stop operation.`);
});
