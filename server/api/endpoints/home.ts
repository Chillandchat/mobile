import { NextFunction, Request, Response } from "express";

import debug from "../debug";

/**
 * This is the home page for the Chill&chat API
 *
 * @type {GET} This is a get typed endpoint.
 */

const home = (_req: Request, res: Response, _next: NextFunction): void => {
  res.status(200).sendFile(__dirname + "/static/index.html");

  debug.log("Home page HTML file sent.");
};

export default home;
