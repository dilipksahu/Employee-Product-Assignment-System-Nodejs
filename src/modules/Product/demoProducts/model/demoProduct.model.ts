import mongoose, { Schema, Document } from "mongoose";
import { IDemoProduct } from "../type/demoProduct.type";


const DemoProductSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image_url: { type: String },
    video_url: { type: String },
    product_category_id: { type: mongoose.Schema.Types.ObjectId, ref: "ProductCategories", required: true },
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    modified_at: { type: Date, default: Date.now },
  }
);

export default mongoose.model<IDemoProduct>("DemoProduct", DemoProductSchema);
