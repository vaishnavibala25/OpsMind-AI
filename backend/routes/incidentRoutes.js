import express from "express";

import {
analyzeIncident
}
from "../controllers/incidentController.js";

const router=express.Router();

router.post(
"/analyze",
analyzeIncident
);

export default router;