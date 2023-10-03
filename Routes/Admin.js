import express from "express";
import { admindetails, adminlogin, deleteuser, isadminlogin, notificationcreate, projectsearch, sendmail, usersearch } from "../Controllers/Admincon.js";

const router = express.Router();
 
router.post("/islogin",isadminlogin);
router.post("/login",adminlogin);
router.post("/details",admindetails);
router.post("/delete",deleteuser);
router.post("/notificationcreate",notificationcreate);
router.post("/usersearch",usersearch);
router.post("/searchproject",projectsearch);
router.post("/sendmail",sendmail);


export default router;