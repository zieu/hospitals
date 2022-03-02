import { Schema, model, Document } from "mongoose";

type PatientType = Document & {
  fullName: string;
  age: number;
  phoneNumber: string;
  medicalService: string;
  address: string;
  postCode: string;
  hospital: string;
};

const PatientSchema = new Schema<PatientType>({
  fullName: String,
  age: Number,
  phoneNumber: String,
  medicalService: String,
  address: String,
  postCode: String,
  hospital: String,
});

const Patient = model("Patient", PatientSchema);

export default Patient;
