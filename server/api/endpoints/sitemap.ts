import { NextFunction, Request, Response } from "express";

import debug from "../debug";

/**
 * This is the sitemap page for the Chill&chat API
 *
 * @type {GET} This is a get typed endpoint.
 */

const siteMap = (_req: Request, res: Response, _next: NextFunction): void => {
  res.status(200).sendFile(__dirname + "/static/sitemap.txt");
  debug.log("Sitemap file sent.");
};

export default siteMap;
