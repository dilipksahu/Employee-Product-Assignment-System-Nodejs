import mongoose, { Document } from "mongoose";

export interface IDemoProduct extends Document {
  title: string;
  description: string;
  image_url: string;
  video_url: string;
  product_category_id: mongoose.Types.ObjectId;
  is_active: boolean;
  created_at: Date;
  modified_at: Date;
}