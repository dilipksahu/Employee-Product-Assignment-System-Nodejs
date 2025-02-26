import mongoose, { Schema, Document } from "mongoose";
import { ICountries } from "../type/countries.type";

const CountriesSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  region_id: { type: mongoose.Schema.Types.ObjectId, ref: "Region", required: true },
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now }
});

const CountriesModel = mongoose.model<ICountries & Document>("Countries", CountriesSchema);

export default CountriesModel;
