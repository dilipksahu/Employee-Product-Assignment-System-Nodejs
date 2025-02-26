import mongoose, { Schema, Document } from "mongoose";
import { IUserDemoMapping } from "../type/userDemoMapping.type";


const UserDemoMappingSchema: Schema = new Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    demo_product_id: { type: mongoose.Schema.Types.ObjectId, ref: "DemoProduct", required: true },
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    modified_at: { type: Date, default: Date.now },
  }
);

export default mongoose.model<IUserDemoMapping>("UserDemoMapping", UserDemoMappingSchema);
