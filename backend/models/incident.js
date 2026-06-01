import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema(
{
  incident: String,
  network: String,
  database: String,
  security: String,
  application: String,
  finalReport: String
},
{
  timestamps: true
}
);

export default mongoose.model(
  "Incident",
  incidentSchema
);