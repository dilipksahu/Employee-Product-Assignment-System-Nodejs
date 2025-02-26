import { Request } from "express";

export interface AuthUser {
  id: string;
  email: string;
  user_type_id: string; 
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}