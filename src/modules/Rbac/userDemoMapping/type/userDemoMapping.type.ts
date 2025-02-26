import mongoose, { Document } from "mongoose";

export interface IUserDemoMapping extends Document {
  user_id: mongoose.Types.ObjectId;
  demo_product_id: mongoose.Types.ObjectId;
  is_active: boolean;
  created_at: Date;
  modified_at: Date;
}