import { Notification } from "../Models/Notification.js";
import { User } from "../Models/User.js"
import jwt from "jsonwebtoken"

export const isAuth = async (req, res, next) => {
    console.log("hjghj")
    try {
        const { token } = req.body;
        if (token) {
            console.log("ere")
            const decoded = await jwt.verify(token.substring(6), 'process.env.JWT_SECRET');
            const newuser = await User.findById(decoded._id);
            req.body.user=newuser
            next();
            } else {
            res.status(304).json({
                success: false,
                message: "not logged in",
            });
        }
    } catch (error) {
        res.status(400).json(error)
    }
}


export const isLogin = async (req, res) => {
    try {
        console.log("idhar")
        const { token } = req.body;
        // const authHeader = req.headers['authorization']
        // const token = authHeader && authHeader.split(' ')[1]
        console.log(token)

        if (token) {
            const decoded = jwt.verify(token.substring(6), 'process.env.JWT_SECRET');
            const newuser = await User.findById(decoded._id);
            let currentDate = new Date().toJSON().slice(0, 10);
            if(newuser.lastlogin != currentDate){
                
                const newrp= newuser.rp + 1;
                const notification = await Notification.create({
                    content:"Received +1 Ranking Points for Daily Login",
                    islink:false,
                    username:newuser.username
                })
                const newnewuser = await User.findByIdAndUpdate(newuser._id,{
                    lastlogin: currentDate,
                    rp: newrp,
                    $push:{notifications:notification._id}
                })
                // console.log(newuser);
                
                res.status(200).json({
                    success: true,
                    newuser:newnewuser,
                    lastlogin:true
                });
            }
            else{

                res.status(200).json({
                    success: true,
                    newuser,
                    lastlogin:false
                });
            }
        } else {
            res.status(202).json({
                success: false,
                message: "not logged in",
            });
        }
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}
export const isvalidemail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            res.status(202).json("")
        }
        else {
            res.status(200).json("")
        }
    } catch (error) {
        res.status(400).json(error)
    }
}
export const isvalidusername = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            res.status(202).json("")
        }
        else {
            res.status(200).json("")
        }
    } catch (error) {
        res.status(400).json(error)
    }
}
export const register = async (req, res) => {
    // console.log(req.body.email)
    try {
        const newuser = await User.create({
            email: req.body.newemail,
            username: req.body.newusername,
            name: req.body.name,
            password: req.body.newpassword,
            domain: req.body.domain,
            clg: req.body.clg,
        })
        // const token = cookieParser(newuser, "secretkey", { expiresIn: "2d" })
        // const token = jwt.sign({ _id: newuser._id }, 'process.env.JWT_SECRET',
        //     {
        //         expiresIn: "15d",
        //     });
        // res.cookie("token", token, {
        //     httpOnly: false,
        // });

        res.status(200).json(newuser)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

export const login = async (req, res) => {
    console.log(req.body.username)
    try {
        const user = await User.findOne({ username: req.body.username })
        // console.log(user)
        if (user && user.password === req.body.password) {
            const token = jwt.sign({ _id: user._id }, 'process.env.JWT_SECRET', {
                expiresIn: "15d",
            })
            // console.log(token)
            // res.cookie("token",token)
            res.status(200).json(token)

        } else {

            res.status(202).json("invalid Authentication");
        }
    } catch (error) {

        res.status(400).json(error);
    }
}
export const searchuser = async(req,res)=>{
    console.log("ma")
    try {
        const user = await User.findOne({username:req.body.username});
        if(user){
            // if(user.username != req.body.user.username){
            //     const notification = await Notification.create({
            //         content:"Someone Visited Your Profile and you receives +5 Ranking Points",
            //         islink:false,
            //         username:user.username
            //     })
            //     user = await User.findByIdAndUpdate(user._id,{
            //         rp:user.rp + 5,
            //         $push:{notifications:notification._id}
            //     })
            // }
            res.status(200).json(user)
        }else{

            res.status(202).json("")
        }
    } catch (error) {
        res.status(400).json(error)
        
    }
}
export const update = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.body.id, {
            email: req.body.email,
            name: req.body.name,
            mobile: req.body.mobile,
            password: req.body.password,
        })

        //delete token
        res.status(200).json("Updated");
    } catch (error) {
        res.status(400).json(error);
    }
}

export const logout = async (req, res) => {
    try {
           
    } catch (error) {
        res.status(400).json(error);
    }
}

export const userdetail = async (req, res) => {
    try {
        const user = await User.findById(req.body.id)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error)
    }
}
export const Searchuser = async(req,res)=>{
    try {
       const regexPattern = new RegExp(req.body.query, "i");
       // console.log(regexPattern)
       const users = await User.find({$or: [{name:{ $regex: regexPattern}}, {username:{$regex: regexPattern}},{email:{$regex: regexPattern}}]})
    //    console.log(project)
       if(users){
           
           res.status(200).json(users)
       }
       else{
           res.status(202).json("")
           
       }
   } catch (error) {
       res.status(400).json(error)
       
   }
}

export const markread = async(req,res)=>{
    try {
        await Notification.findByIdAndUpdate(req.body.id,{
            active:false,
        })
        res.status(200).json("");
    } catch (error) {
        res.status(400).json(error);
        
    }
}
export const notification = async(req,res)=>{
    try {
        const notification =  await Notification.findById(req.body.id)
        res.status(200).json(notification);
    } catch (error) {
        res.status(400).json(error);
        
    }
}

