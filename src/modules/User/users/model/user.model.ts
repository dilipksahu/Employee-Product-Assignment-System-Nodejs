import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../type/user.type";


const UserSchema: Schema = new Schema(
  {
    user_type_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserType", required: true },
    name: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department: { type: String },
    designation: { type: String },
    region_id: { type: mongoose.Schema.Types.ObjectId, ref: "Region" },
    country_id: { type: mongoose.Schema.Types.ObjectId, ref: "Countries" },
    city_id: { type: mongoose.Schema.Types.ObjectId, ref: "Cities" },
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    modified_at: { type: Date, default: Date.now },
  }
);

export default mongoose.model<IUser>("User", UserSchema);
