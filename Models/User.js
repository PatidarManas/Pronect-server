import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    domain: {
        type: String,
        required: true,
    },
    lastlogin:{
        type: String,
        default:0,
    },
    
    currentstreak:{
        type:Number,
        default:0,
        required:true,
    },
    longeststreak:{
        type:Number,
        default:0,
        required:true,
    },
    password: {
        type: String,
        required: true,
    },
    comments: [],
    clg: {
        type: String,
        required: true,
    },
    projects: [],
    rp:{
        type:Number,
        default:0,
        required:true,
    },
    notifications:[],
    rating:{
        type: Number,
        default: 0,
    }


}, { timestamps: true });

mongoose.models = {};

export const User = mongoose.model("User", schema);