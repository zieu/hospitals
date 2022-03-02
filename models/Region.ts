import { Schema, model, Document, SchemaTypes } from "mongoose";

type Hospital = {
  postCode: number;
  name: string;
  type: string;
};

export type TRegion = Document & {
  postCode: number;
  district: string;
  neighbours: number[];
  hospitals: Hospital[];
};

const RegionSchema = new Schema<TRegion>({
  postCode: Number,
  district: String,
  neighbours: [],
  hospitals: [],
});

const Region = model("Region", RegionSchema);

export default Region;
