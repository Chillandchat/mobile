import { NextFunction, Request, Response } from "express";
import { randomColor } from "randomcolor";
import bcrypt from "bcrypt";

import roomSchema from "../schema/roomSchema";
import debug from "../utils/debug";

/**
 * This is the create room endpoint, this endpoint wil create a room once called.
 *
 * @param {string} id The id of the room the new room
 * @param {string} name The name of the room.
 * @param {string} user The users in the room.
 * @param {string} passcode The passcode of the room.
 * @returns {string} The function will return the status of the request.
 */

const createRoom = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  if (req.query.key !== String(process.env.KEY)) {
    res.status(401).send("Invalid api key.");
    return;
  }

  try {
    await new roomSchema({
      id: req.body.id,
      name: req.body.name,
      users: [req.body.user],
      passcode: await bcrypt.hash(
        req.body.passcode,
        await bcrypt.genSaltSync()
      ),
      iconColor: randomColor(),
    })
      .save()
      .then((): void => {
        res.status(201).send("Room created.");

        debug.log(`Room ${req.body.id} created.`);
      });
  } catch (err: unknown) {
    res.status(500).send(`${err}`);

    debug.error(err);
  }
};

export default createRoom;
