import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    severity: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium"
    },

    status: {
      type: String,
      enum: ["Open", "Investigating", "Resolved"],
      default: "Open"
    },

    executiveSummary: {
      type: String,
      default: ""
    },

    rankings: [
      {
        agent: String,
        score: Number
      }
    ],

    network: mongoose.Schema.Types.Mixed,

    database: mongoose.Schema.Types.Mixed,

    security: mongoose.Schema.Types.Mixed,

    application: mongoose.Schema.Types.Mixed,

    finalReport: mongoose.Schema.Types.Mixed,

    rootCause: {
      primary: String,

      contributing: [String],

      excluded: [String]
    },

    impact: {
      technical: [String],

      business: [String]
    },

    risk: {
      shortTerm: [String],

      longTerm: [String]
    },

    recommendation: [String]
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Incident",
  incidentSchema
);