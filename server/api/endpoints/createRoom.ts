import { randomColor } from 'randomcolor';
import roomSchema from "../schema/roomSchema";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import debug from "../debug";

/**
 * This is the create room endpoint, this endpoint wil create a room once called.
 *
 * @param {string} key The api key.
 * @param {string} id The id of the room the new room
 * @param {string} name The name of the room.
 * @param {string} users The users in the room.
 * @param {string} passcode The passcode of the room.
 * @returns {string} The function will return the status of the request.
 */

const createRoom = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  if (req.query.key !== String(process.env.KEY)) {
    res.status(401).send("ERROR: Invalid api key.");
  }

  try {
    const newRoom: any = new roomSchema({
      id: req.body.id,
      name: req.body.name,
      users: req.body.users,
      passcode: await bcrypt.hash(
        req.body.passcode,
        await bcrypt.genSaltSync()
      ),
      iconColor: randomColor(),
    });
    await newRoom
      .save()
      .then((): void => {
        res.status(201).send("Room created.");
        debug.log(`Room ${req.body.id} created.`);
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

export default createRoom;
