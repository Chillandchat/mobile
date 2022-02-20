import { NextFunction, Request, Response } from "express";
import { MessageSchemaType } from "../index.d";
import message from "../schema/messageSchema";

/**
 * This is the get message endpoint, this endpoint is used to get messages in the database.
 *
 * @type {GET} This is a get type endpoint.
 * @returns {Array<MessageSchemaType> | string} Returns a array of messages or a error message in a string formatt, @see type.d.ts for more information.
 */

const getMessages = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  if (req.query.key !== String(process.env.KEY)) {
    res.status(401).send("ERROR: Invalid api key.");
    return;
  }
  try {
    await message
      .find()
      .exec()
      .then(
        (data: Array<MessageSchemaType>): Response => res.status(200).send(data)
      );
  } catch (err: unknown) {
    res.status(500).send(`SERVER ERROR: ${err}`);
  }
};

export default getMessages;
