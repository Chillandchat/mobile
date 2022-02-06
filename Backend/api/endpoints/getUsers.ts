import { AuthSchemaType } from "../index.d";
import user from "../authSchema";

/**
 * This is the get users endpoint, this endpoint will return all users once called.
 *
 * @type {GET} This is a get endpoint.
 * @returns {Array<AuthSchemaType>} Returns a array of users, see './type.d.ts' for details.
 */

const getUsers = async (req: any, res: any, _next: any): Promise<void> => {
  if (req.query.key !== String(process.env.KEY)) {
    res.status(401).send("ERROR: Invalid api key.");
  }
  try {
    await user
      .find()
      .exec()
      .then((data: Array<AuthSchemaType>): void => res.status(200).send(data));
  } catch (err: unknown) {
    res.status(500).send(`SERVER ERROR: ${err}`);
  }
};

export default getUsers;
