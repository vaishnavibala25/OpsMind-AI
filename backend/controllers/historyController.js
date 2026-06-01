import Incident from "../models/Incident.js";

export const getIncidents =
async (req,res)=>{

try{

const incidents =
await Incident.find()
.sort({createdAt:-1});

res.json(incidents);

}
catch(error){

res.status(500).json({
message:error.message
});

}

};