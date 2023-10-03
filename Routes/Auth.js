import express from "express";
import { Searchuser, complaintregister, isAuth, isLogin, isvalidemail, isvalidusername, login, markread, notification, register, searchuser } from "../Controllers/Authcon.js";

const router = express.Router();
 
router.post("/islogin",isLogin);
router.post("/register",register);
router.post("/login",login);
router.post("/emailvalid",isvalidemail);
router.post("/usernamevalid",isvalidusername);
router.post("/searchuser",isAuth,searchuser);
router.post("/search",Searchuser);
router.post("/markread",isAuth,markread);
router.post("/notification",isAuth,notification);
router.post("/issue",isAuth,complaintregister);


export default router;