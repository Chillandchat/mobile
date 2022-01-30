import express from "express";
import user from "./authSchema";
import message from "./messageSchema";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { AuthSchemaType, MessageSchemaType } from "./type";
import {
  rateLimit as RateLimit,
  RateLimitRequestHandler,
} from "express-rate-limit";
import * as bcrypt from "bcrypt";

dotenv.config();
const app: express.Express = express();
const port: string = "8080";

mongoose.connect(String(process.env.API_URI));

const limiter: RateLimitRequestHandler = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
});

app.use(express.json());
app.use(cors({}));
app.use(limiter);

/**
 * This is the home page for the Chill&chat API
 *
 * @type {GET} The type of the endpoint.
 */

app.get("/", (_req: any, res: any, _next: any): void => {
  res.status(200).send("Welcome to the Chill&chat API!");
});

/**
 * This is the get message endpoint, this endpoint is used to get messages in the database.
 *
 * @type {GET} The type of the endpoint.
 * @returns {Array<MessageSchemaType>} Returns a array of messages, check './type.d.ts' for more information.
 */

app.get(
  "/api/get-messages",
  async (req: any, res: any, _next: any): Promise<void> => {
    if (req.query.key !== String(process.env.KEY)) {
      res.status(401).send("ERROR: Invalid api key.");
      return;
    }
    try {
      await message
        .find()
        .exec()
        .then((data: Array<MessageSchemaType>): void =>
          res.status(200).send(data)
        );
    } catch (err: unknown) {
      res.status(500).send(`SERVER ERROR: ${err}`);
    }
  }
);

// TODO: Update message like count
//  app.put('/api/update_like_count', (req, res) => {
//    try {
//      message.findOneAndUpdate({ id: req.body.id }, { likes: req.body.likes })
//    } catch (err) {
//      res.status(500).send(`SERVER ERROR: ${err}`)
//    }
//  })

/**
 * This is the signup endpoint this endpoint will create a new user in the data base when called.
 *
 * @type {POST} type of the endpoint.
 * @returns {string} Returns the result as a string format.
 * @param {AuthSchemaType} user The user information, see './type.d.ts' for details.
 */

app.post(
  "/api/signup",
  async (req: any, res: any, _next: any): Promise<void> => {
    if (req.query.key !== String(process.env.KEY)) {
      res.status(401).send("ERROR: Invalid api key.");
    }
    try {
      const newUser: any = new user({
        id: req.body.id,
        username: req.body.username,
        password: await bcrypt.hash(
          req.body.password,
          await bcrypt.genSalt(Number(Math.floor(Math.random() * 64) + 10))
        ),
        verified: req.body.verified,
        bot: req.body.bot,
        blocked: req.body.blocked,
      });
      await newUser.save().then((): void => {
        res.status(201).send("Saved successfully, no errors and problems.");
      });
    } catch (err: unknown) {
      res.status(500).send(`SERVER ERROR: ${err}`);
    }
  }
);

/**
 * This is the get users endpoint, this endpoint will return all users once called.
 *
 * @type {GET} The type of the endpoint.
 * @returns {Array<AuthSchemaType>} Returns a array of users, see './type.d.ts' for details.
 */

app.get(
  "/api/get-users",
  async (req: any, res: any, _next: any): Promise<void> => {
    if (req.query.key !== String(process.env.KEY)) {
      res.status(401).send("ERROR: Invalid api key.");
    }
    try {
      await user
        .find()
        .exec()
        .then((data: Array<AuthSchemaType>): void =>
          res.status(200).send(data)
        );
    } catch (err: unknown) {
      res.status(500).send(`SERVER ERROR: ${err}`);
    }
  }
);

/**
 * This endpoint is used to login a user once called.
 *
 * @type {POST} The type of the endpoint.
 * @param {string} username The username that the user entered.
 * @param {string} password The password that the user entered.
 * @returns {string} Returns the result of the login in a string format.
 */

app.post(
  "/api/login",
  async (req: any, res: any, _next: any): Promise<void> => {
    if (req.query.key !== String(process.env.KEY)) {
      res.status(401).send("ERROR: Invalid api key.");
    }
    try {
      await user
        .findOne({ $eq: { username: req.body.user } })
        .exec()
        .then(
          async (data: AuthSchemaType | null | undefined): Promise<void> => {
            if (data != null && data != undefined) {
              if (await bcrypt.compare(data.password, req.body.password))
                res.status(200).send("User login success");
              else res.status(400).send("Invalid password");
            } else res.status(400).send("User not found");
          }
        )
        .catch((err: unknown): void => {
          res.status(500).send(`SERVER ERROR: ${err}`);
        });
    } catch (err: unknown) {
      res.status(500).send(`SERVER ERROR: ${err}`);
    }
  }
);

/**
 * This endpoint will return the user information from the server once called.
 *
 * @type {GET} The type of the endpoint.
 * @param {string} username The username of the user you want to search.
 * @returns {AuthSchemaType | string} Returns the user information or a error message.
 */

app.get(
  "/api/get-user-info",
  async (req: any, res: any, _next: any): Promise<void> => {
    if (req.query.key !== String(process.env.KEY)) {
      res.status(401).send("ERROR: Invalid api key.");
    }
    try {
      await user
        .findOne({ $eq: { username: req.query.user } })
        .exec()
        .then((data: AuthSchemaType | null | undefined): void => {
          if (data != null || data != undefined) res.status(200).send(data);
          else res.status(404).send("User not found");
        })
        .catch((err: unknown): void => {
          res.status(500).send(`SERVER ERROR: ${err}`);
        });
    } catch (err: unknown) {
      res.status(500).send(`SERVER ERROR: ${err}`);
    }
  }
);

/**
 * This endpoint will report a user via email once called.
 *
 * @type {POST} The type of the endpoint.
 * @param {string} user The user that will be reported.
 * @param {string} email The user that reported the user.
 * @returns {string} Returns the result in a string format.
 */

app.post(
  "/api/report-user",
  async (req: any, res: any, _next: any): Promise<void> => {
    if (req.query.key !== String(process.env.KEY)) {
      res.status(401).send("ERROR: Invalid api key.");
    }

    let emailOk: boolean = false;
    let error: string;

    const transporter: typeof nodemailer.createTransport =
      nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.API_EMAIL,
          pass: process.env.API_EMAIL_PASS,
        },
      });
    const mailOptions: any = {
      from: process.env.API_EMAIL,
      to: "chengalvin333@gmail.com",
      subject: "You have a new report from the Chill&chat server",
      text: `${req.body.user} has reported ${req.body.reportUser}'s message.\nMessage: '${req.body.reason}'\n`,
    };
    await transporter.sendMail(
      mailOptions,
      (err: any, _data: any, _next: any): void => {
        if (err) {
          error = err;
          emailOk = false;
        } else emailOk = true;
      }
    );
    if (emailOk) res.status(200).send();
    else res.status(500).send(`SERVER ERROR: ${error}`);
  }
);

/**
 * This endpoint is used to block a user from Chill&chat.
 *
 * @type {PUT} The type of the endpoint.
 * @param {string} user The user to block.
 * @param {boolean} blockStatus Whether the user should be blocked.
 * @returns {string} Retuns the result in string format.
 */

app.put(
  "/api/block_user",
  async (req: any, res: any, _next: any): Promise<void> => {
    if (req.query.key !== String(process.env.KEY)) {
      res.status(401).send("ERROR: Invalid api key.");
    }

    let error: boolean = false;

    await user
      .findOneAndUpdate({ $eq: { username: req.body.user } })
      .exec()
      .then((data: AuthSchemaType | null | undefined): void => {
        if (data != null || data != undefined) {
          try {
            data.blocked = req.body.blockedStatus;
            data.save();
          } catch (err: unknown) {
            error = true;
          }
        } else res.status(404).send("User not found");
        if (!error) res.status(200).send();
        error = false;
      });
  }
);

const notFound = (_req: any, res: any, _next: any): void => {
  res
    .status(404)
    .send(
      "REQUEST ERROR: The page you requested was not found, please type a valid URL."
    );
};
app.use(notFound);

app.listen(port, (): void => {
  console.log(
    `Server Ready and listening on port ${port}.\nPress CTRL + C to stop operation.`
  );
});
