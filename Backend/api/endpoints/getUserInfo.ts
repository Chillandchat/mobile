import { NextFunction, Request, Response } from "express";
import { AuthSchemaType } from "../index.d";
import user from "../schema/authSchema";

/**
 * This endpoint will return the user information from the server once called.
 *
 * @type {GET} This is a get typed endpoint.
 * @param {string} username The username of the user you want to search.
 * @returns {AuthSchemaType | string} Returns the user information or a error message.
 */

const getUserInfo = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  if (req.query.key !== String(process.env.KEY)) {
    res.status(401).send("ERROR: Invalid api key.");
  }
  try {
    await user
      .findOne({ username: { $eq: req.query.user } })
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
};

export default getUserInfo;
