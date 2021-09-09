import { Request, Response, NextFunction } from "express";

export default class ErrorHandler {
  static handleError(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log("Error Handling Middleware called");
    console.log("Path: ", req.path);
    console.error("Error: ", error);
    console.error("Error stack: ", error.stack);
    // console.error("Error type: ", error.type);
    res.status(500).send("Internal Server Error");
  }
}
