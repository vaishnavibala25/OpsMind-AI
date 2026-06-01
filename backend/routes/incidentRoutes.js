import express from "express";
import {
 analyzeIncident
}
from "../controllers/incidentController.js";
import {
getIncidents
}
from "../controllers/historyController.js";
const router = express.Router();

router.post("/analyze", analyzeIncident);
router.get(
 "/history",
 getIncidents
);

export default router;