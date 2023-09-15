import express from "express";
import { Searchproject, comment, dislike, findcomment, like, newproject,viewproject } from "../Controllers/Projectcon.js";
import { isAuth } from "../Controllers/Authcon.js";

const router = express.Router();
 
router.post("/new",isAuth,newproject);
router.post("/view",isAuth,viewproject);
router.post("/search",Searchproject);
router.post("/like",isAuth,like);
router.post("/dislike",isAuth,dislike);
router.post("/newcomment",isAuth,comment);
router.post("/comment",findcomment);
export default router;