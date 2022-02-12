import { NextFunction, Request, Response } from "express";

/**
 * This is the sitemap page for the Chill&chat API
 *
 * @type {GET} This is a get typed endpoint.
 */

const siteMap = (_req: Request, res: Response, _next: NextFunction): void => {
  res.status(200).sendFile(__dirname + "/static/sitemap.txt");
};

export default siteMap;
