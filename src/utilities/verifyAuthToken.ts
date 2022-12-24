import jwt from "jsonwebtoken";
import express from "express";

const verifyAuthToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  //create
  try {
    const authorizationHead = req.headers.authorization as string;
    const token = authorizationHead.split(" ")[1];

    jwt.verify(token, process.env.TOKEN_SECRET as string);

    next();
  } catch (error) {
    res.status(401).send(error);
    return;
  }
};

export default verifyAuthToken;
