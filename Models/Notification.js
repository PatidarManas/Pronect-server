import mongoose from "mongoose";

const schema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        
    },
    islink: {
        type: Boolean,
        required: true,
    },
    active: {
        type: Boolean,
        
        default:true
    },
    username:{
        type:String,
        required:true,
    }
   
}, { timestamps: true });

mongoose.models = {};

export const Notification = mongoose.model("Notification", schema);