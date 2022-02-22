import roomSchema from "../schema/roomSchema";
import { NextFunction, Request, Response } from "express";
import { RoomSchemaType } from "../index.d";
import debug from "../debug";

/**
 * This get all rooms endpoint will return all rooms that the inputed user has once called.
 *
 * @type {GET} This is a get typed endpoint.`
 * @param {string} user The id of the user you want to search.
 * @param {string} key The api key.
 * @returns {Array<RoomSchemaType>} Returns an array of rooms, see './type.d.ts' for details.
 */

const getAllRooms = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  if (req.query.key !== String(process.env.KEY)) {
    res.status(401).send("ERROR: Invalid api key.");
  }

  try {
    await roomSchema
      .find({ users: { $elemMatch: { $eq: req.body.user } } })
      .exec()
      .then((data: Array<RoomSchemaType>): void => {
        res.status(200).send(data);
        debug.log(`User ${req.query.user} has found ${data.length} rooms.`);
      });
  } catch (err: unknown) {
    res.status(500).send(`SERVER ERROR: ${err}`);
    debug.error(err);
  }
};

export default getAllRooms;
