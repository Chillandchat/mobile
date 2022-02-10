import { NextFunction, Request, Response } from "express";
import { RoomSchemaType } from "../index.d";
import roomSchema from "../schema/roomSchema";

/**
 * This get all rooms endpoint will return all rooms that the inputed user has once called.
 * 
 * @type {GET} This is a get typed endpoint.`
 * @param {string} user The id of the user you want to search.
 * @param {string} key The api key of the user you want to search.
 * @returns {Array<RoomSchemaType>} Returns an array of rooms, see './type.d.ts' for details.
 */

const getAllRooms = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
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
          for (let e: number = 0; i < data[e].users.length; i++) {
            if (req.query.user === data[i].users[i]) rooms.push(data[i]);
          }
        }
        res.status(200).send(rooms);
      });
  } catch (err) {
    res.status(500).send(`SERVER ERROR: ${err}`);
  }
};

export default getAllRooms;
