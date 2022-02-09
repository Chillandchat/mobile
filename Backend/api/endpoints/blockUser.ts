import { AuthSchemaType } from "../index.d";
import user from "../schema/authSchema";

/**
 * This endpoint is used to block a user from Chill&chat.
 *
 * @deprecated
 * @type {PUT} This is a put endpoint
 * @param {string} user The user to block.
 * @param {boolean} blockStatus Whether the user should be blocked.
 * @returns {string} Retuns the result in string format.
 */

const blockUser = async (req: any, res: any, _next: any): Promise<void> => {
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
};

export default blockUser;
