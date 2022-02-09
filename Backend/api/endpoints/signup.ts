import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { AuthSchemaType } from "../index.d";
import user from "../schema/authSchema";

/**
 * This is the signup endpoint this endpoint will create a new user in the data base when called.
 *
 * @type {POST} this ia a post typed endpoint.
 * @returns {string} Returns the result as a string format.
 * @param {AuthSchemaType} user The user information, @see {index.d.ts} for details.
 */

const signup = async (
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
          if (bcrypt.compare(data.password, req.body.password)) {
            res.status(200).send("User login success");
          } else res.status(400).send("Invalid password");
        } else res.status(400).send("User not found");
      })
      .catch((err: unknown): void => {
        res.status(500).send(`SERVER ERROR: ${err}`);
      });
  } catch (err: unknown) {
    res.status(500).send(`SERVER ERROR: ${err}`);
  }
};

export default signup;
