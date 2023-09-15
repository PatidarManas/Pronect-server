import mongoose from "mongoose";

const schema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    projectid: {
        type: String,
        required: true,
    },
   
}, { timestamps: true });

mongoose.models = {};

export const Comment = mongoose.model("Comment", schema);