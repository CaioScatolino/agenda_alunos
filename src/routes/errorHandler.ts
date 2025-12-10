import { ErrorRequestHandler, RequestHandler } from "express";

export const notFoundRequest: RequestHandler = (req, res, next) => {
  res.status(404).send("Not Found");
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).send("Internal Server Error");
};
