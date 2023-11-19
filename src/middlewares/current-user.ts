import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.cookies?.jwt) {
    // If there is no jwt, pass on to the next function, without setting currentUser object.
    return next();
  }

  // If there is a jwt present, verify it with JWT_KEY and extract payload from it.
  try {
    const payload = jwt.verify(
      req.cookies.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;

    // If the jwt is successfully verified, create a currentUser object in response object,
    // and return the payload extracted from jwt.
    req.currentUser = payload;
  } catch (err) {
    // If the token validation fails, jwt.verify is going to throw error.
    // It can be ignored as we have nothing to do in this middleware about this particular error.
  }

  next();
};
