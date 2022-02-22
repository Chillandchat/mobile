import { RoomSchemaType } from "./../index.d";
import { NextFunction, Request, Response } from "express";
import roomSchema from "../schema/roomSchema";
import bcrypt from "bcrypt";
import debug from "../debug";

/**
 * This is the join room endpoint, this endpoint will join a room once called.
 *
 * @type {POST} This is a post endpoint.
 * @param {string} id The room id.
 * @param {string} user The user to be added to the room.
 * @param {string} passcode The passcode of the room.
 * @returns {String} Returns a string of the status message.
 */

const joinRoom = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  if (req.query.key !== String(process.env.KEY)) {
    res.status(401).send("ERROR: Invalid api key.");
    return;
  }

  try {
    await roomSchema
      .findOne({ id: req.body.id })
      .then(async (data: RoomSchemaType): Promise<void> => {
        if (data.passcode !== "") {
          if (!(await bcrypt.compare(req.body.passcode, data.passcode))) {
            res.status(400).send("Incorrect passcode.");
            return;
          }
        }

        await roomSchema
          .findOneAndUpdate(
            { id: req.body.id },
            { $push: { users: req.body.user } }
          )
          .then(() => {
            res.status(200).send("Successfully joined room.");
            debug.log(`User ${req.body.user} has joined room ${req.body.id}.`);
          })
          .catch((err: unknown) => {
            res.status(500).send(`SERVER ERROR: ${err}`);
            debug.error(err);
          });
      })
      .catch((err: unknown) => {
        res.status(500).send(`SERVER ERROR: ${err}`);
        debug.error(err);
      });
  } catch (err: unknown) {
    res.status(500).send(`SERVER ERROR: ${err}`);
    debug.error(err);
  }
};

export default joinRoom;
