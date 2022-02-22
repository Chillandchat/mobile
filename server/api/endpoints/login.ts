import { AuthSchemaType } from "../index.d";
import user from "../schema/authSchema";
import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import debug from "../debug";

/**
 * This endpoint is used to login a user once called.
 *
 * @type {POST} This is a post typed endpoint.
 * @param {string} username The username that the user entered.
 * @param {string} password The password that the user entered.
 * @returns {string} Returns the result of the login in a string format.
 */

const login = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  if (req.query.key !== String(process.env.KEY)) {
    res.status(401).send("ERROR: Invalid api key.");
  }
  try {
    await user
      .findOne({ username: { $eq: req.body.username } })
      .exec()
      .then(async (data: AuthSchemaType | null | undefined): Promise<void> => {
        if (data != null && data != undefined) {
          if (await bcrypt.compare(req.body.password, data.password)) {
            res.status(200).send("User login success");
            debug.log("User login success");
          } else res.status(400).send("Invalid password");
        } else res.status(400).send("User not found");
      })
      .catch((err: unknown): void => {
        res.status(500).send(`SERVER ERROR: ${err}`);
        debug.error(err);
      });
  } catch (err: unknown) {
    res.status(500).send(`SERVER ERROR: ${err}`);
    debug.error(err);
  }
};

export default login;
