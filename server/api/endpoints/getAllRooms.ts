import roomSchema from "../schema/roomSchema";
import { NextFunction, Request, Response } from "express";
import { RoomSchemaType } from "../index.d";

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
    return;
  }

  try {
    await roomSchema
      .find()
      .exec()
      .then((data: Array<RoomSchemaType>): void => {
        let rooms: Array<RoomSchemaType> = [];
        for (let i: number = 0; i < data.length; i++) {
          for (let j: number = 0; j < data[j].users.length; j++) {
            if (req.query.user === data[j].users[j]) rooms.push(data[j]);
          }
        }
        res.status(200).send(rooms);
      });
  } catch (err: unknown) {
    res.status(500).send(`SERVER ERROR: ${err}`);
  }
};

export default getAllRooms;
