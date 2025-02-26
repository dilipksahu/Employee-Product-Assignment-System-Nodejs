import mongoose, { Schema, Document } from "mongoose";
import { ICities } from "../type/cities.type";

const CitiesSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  country_id: { type: mongoose.Schema.Types.ObjectId, ref: "Countries", required: true },
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now }
});

const CitiesModel = mongoose.model<ICities & Document>("Cities", CitiesSchema);

export default CitiesModel;