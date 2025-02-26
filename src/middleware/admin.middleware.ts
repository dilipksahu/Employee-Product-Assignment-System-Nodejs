import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../modules/User/users/model/user.model";
import UserTypeModel from "../modules/User/userTypes/model/userType.model";
import { AuthRequest } from "./types/auth.type";

export const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token
    if (!token) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await UserModel.findById(decoded.id); // Find user from DB
    const userType = await UserTypeModel.findById(decoded.user_type_id); // Find user from DB

    if (!user || userType?.type_name !== "admin") { 
      res.status(403).json({ success: false, message: "Access denied. Only admin users can perform this action." });
      return;
    }
    req.user = decoded; // Attach user to request
    next(); // Proceed to next middleware
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};