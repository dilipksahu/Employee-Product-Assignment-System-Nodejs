import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../modules/User/users/model/user.model"; 
import { AuthRequest } from "./types/auth.type";

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Extract token from request headers
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
      return;
    }

    // Verify the token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    
    // Fetch user details from DB using decoded user ID
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      res.status(401).json({ success: false, message: "Unauthorized: Invalid user" });
      return;
    }

    // Attach user data to request
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
  }
};