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
    const newUser: any = new user({
      id: req.body.id,
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, await bcrypt.genSalt()),
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
};

export default signup;
