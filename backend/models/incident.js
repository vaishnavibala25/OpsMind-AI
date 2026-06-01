import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema({

    description:{
        type:String,
        required:true
    },

    analysis:{
        type:String
    }

},{
    timestamps:true
});

export default mongoose.model("Incident",incidentSchema);