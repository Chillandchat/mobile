import { MessageSchemaType } from "../index.d";
import message from "../schema/messageSchema";

/**
 * This is the get message endpoint, this endpoint is used to get messages in the database.
 *
 * @type {GET} This is a get type endpoint.
 * @returns {Array<MessageSchemaType>} Returns a array of messages, check './type.d.ts' for more information.
 */

const getMessages = async (req: any, res: any, _next: any): Promise<void> => {
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
};

export default getMessages;
