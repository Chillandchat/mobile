import { NextFunction, Request, Response } from "express";

/**
 * This is the home page for the Chill&chat API
 *
 * @type {GET} This is a get typed endpoint.
 */


const home = (_req: Request, res: Response, _next: NextFunction): void => {
  res.status(200).send("Welcome to the Chill&chat API, please see the offical Chill&chat github for more information.");
};

export default home;
