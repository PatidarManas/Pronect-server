import { Notification } from "../Models/Notification.js";
import { Project } from "../Models/Project.js";
import { User } from "../Models/User.js";
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
export const adminlogin = (req,res)=>{
    try {
        console.log(req.body.password)
        if(req.body.password=="admin@123"){
            const admintoken = jwt.sign({ _id: "adminnew" }, 'process.env.JWT_SECRET', {
                expiresIn: "15d",
            })
            console.log(admintoken)
            res.status(200).json(admintoken);
        }else{
            res.status(202).json("");
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

export const isadminlogin =  (req,res)=>{
    try {
        const admintoken1 = req.body.admintoken.split('; ')[0]
        const admintoken2 = req.body.admintoken.split('; ')[1]
        const admintoken = admintoken1.startsWith('admintoken') ? admintoken1 : admintoken2 

        if(admintoken){
            const decoded = jwt.verify(admintoken.substring(11), 'process.env.JWT_SECRET');
            if(decoded._id =="adminnew"){
            
                res.status(200).json("logged")
            }else{
                res.status(204).json("not logged")
            }
        }else{
            res.status(204).json("not logged")
        }
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
        
    }
}

export const admindetails = async(req,res)=>{
    try {
        const users = await User.find();
        const projects = await Project.find();
        res.status(200).json({users,projects});
    } catch (error) {
        res.status(400).json("");
        
    }
}

export const deleteuser = async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.body.id);
        res.status(200).json("deleted");
    } catch (error) {
        res.status(400).json("");
        
    }
}

export const notificationcreate = async(req,res)=>{
    try {
        const noti =  await Notification.create({
            content:req.body.content,
            link:req.body.link,
            islink:req.body.islink,
            username:req.body.username
        })
        await User.findOneAndUpdate({username:req.body.username},{
            $push:{notifications:noti._id}
        })
        res.status(200).json("success")
    } catch (error) {
        res.status(400).json(error)
        
    }
}

export const usersearch = async(req,res)=>{
    try {
        const user = await User.findOne({username:req.body.username})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error)
        
    }
}


export const projectsearch = async(req,res)=>{
    try {
        const project = await Project.findById(req.body.id)
        res.status(200).json(project)
    } catch (error) {
        res.status(400).json(error)
        
    }
}
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "p.pronect@gmail.com",
      pass: "xrtz fvzq kpxc rhow",
    },
  }); 
export const sendmail = async(req,res)=>{
    try {
        const info = await transporter.sendMail({
            from: 'p.pronect@gmail.com', 
            to: req.body.mail, 
            subject: `${req.body.subject}`,
            html: `${req.body.content + "<br></br><br></br><br></br><br></br> Thank you <br></br> Lets Build Together <br></br> -Team Pronect <br></br> p.pronect@gmail.com" }`, 
           
          });
          res.status(200).json("sent")
        } catch (error) {
            console.log(error)
        res.status(400).json(error)
        
    }
}