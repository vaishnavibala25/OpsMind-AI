import Incident from "../models/incident.js";

export const getIncidents = async (req, res) => {
  try {

    const incidents = await Incident.find()
      .sort({ createdAt: -1 });

    res.status(200).json(incidents);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};