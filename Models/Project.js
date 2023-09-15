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
    domain: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    discription: {
        type: String,
        required: true,
    },
    visiblity:{
        type:Boolean,
        required:true
    },
    views:{
        type:Number,
        default:0,
    },
    likes:[],
    dislikes:[],
    comments: [],
    clg: {
        type: String,
        required: true,
    },
    members: [],
    links: [],
    rating: {
        type: Number,
        default: 0,
    }


}, { timestamps: true });

mongoose.models = {};

export const Project = mongoose.model("Project", schema);