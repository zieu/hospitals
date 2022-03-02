import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";

import Patient from "./models/Patient";
import search from "./searchHospitals";
import Region from "./models/Region";
import parse from "./parser";
const regions = require("./regions.json");

const DB = "mongodb://localhost/hospitals";
const PORT = 5000;

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log(err.message));

app.get("/hospitals", async (req: Request, res: Response) => {
  let hospitals;

  hospitals = await Region.find();

  if (!hospitals.length) {
    await parse(JSON.parse(JSON.stringify(regions.regions)));
    hospitals = await Region.find();
  }

  const { postCode, type } = req.query;
  const result = search(hospitals, Number(postCode), type as string);

  res.json(result);
});

app.get("/patients", async (req: Request, res: Response) => {
  const patients = await Patient.find();
  res.json(patients);
});

app.post("/patients", async (req: Request, res: Response) => {
  try {
    const patient = await Patient.create(req.body);
    console.log(req.body);

    res.json({
      success: true,
      patient,
    });
  } catch (error) {
    res.json({
      success: false,
      error: "Something went wrong!",
    });
  }
});

app.listen(PORT, () => console.log("App is running on port: " + PORT));
