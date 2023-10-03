import mongoose from "mongoose";

const schema = new mongoose.Schema({
    topic:{
        type:Array,
        required:true,
    },
    username: {
        type: String,
        required: true,
    },
    issue: {
        type: String,
        required: true,
    },
    status:{
        type:String,
        default:"Created"
    }
   
}, { timestamps: true });

mongoose.models = {};

export const Complaint = mongoose.model("Complaint", schema);