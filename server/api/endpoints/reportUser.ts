import { NextFunction, Request, Response } from "express";
import { nodemailer } from "nodemailer";

/**
 * This endpoint will report a user via email once called.
 *
 * @deprecated This endpoint is no longer used.
 * @type {POST} This is a post typed endpoint.
 * @param {string} user The user that will be reported.
 * @param {string} email The user that reported the user.
 * @returns {string} Returns the result in a string format.
 */

const reportUser = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  if (req.query.key !== String(process.env.KEY)) {
    res.status(401).send("ERROR: Invalid api key.");
  }

  let emailOk: boolean = false;
  let error: string;

  const transporter: typeof nodemailer.createTransport =
    nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.API_EMAIL,
        pass: process.env.API_EMAIL_PASS,
      },
    });
  const mailOptions: any = {
    from: process.env.API_EMAIL,
    to: "chengalvin333@gmail.com",
    subject: "You have a new report from the Chill&chat server",
    text: `${req.body.user} has reported ${req.body.reportUser}'s message.\nMessage: '${req.body.reason}'\n`,
  };
  await transporter.sendMail(
    mailOptions,
    (err: any, _data: any, _next: any): void => {
      if (err) {
        error = err;
        emailOk = false;
      } else emailOk = true;
    }
  );
  if (emailOk) res.status(200).send();
  else res.status(500).send(`SERVER ERROR: ${error}`);
};

export default reportUser;
