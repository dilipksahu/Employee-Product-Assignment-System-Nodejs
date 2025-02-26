import mongoose, { Schema, Document } from "mongoose";
import { IRegion } from "../type/region.type";

const RegionSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now }
});

const RegionModel = mongoose.model<IRegion & Document>("Region", RegionSchema);

export default RegionModel;
