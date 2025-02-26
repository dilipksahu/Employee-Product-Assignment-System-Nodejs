import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  user_type_id: mongoose.Types.ObjectId;
  name: string;
  mobile: string;
  email: string;
  password?: string;
  department: string;
  designation: string;
  region_id: mongoose.Types.ObjectId;
  country_id: mongoose.Types.ObjectId;
  city_id: mongoose.Types.ObjectId;
  is_active: boolean;
  created_at: Date;
  modified_at: Date;
  session_id?: string;
}

export interface EditUserRequest extends Request {
  user?: IUser;
}
