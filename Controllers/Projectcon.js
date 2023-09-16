import { Comment } from "../Models/Comment.js";
import { Notification } from "../Models/Notification.js";
import { Project } from "../Models/Project.js"
import { User } from "../Models/User.js"
export const newproject = async (req, res) => {
    try {
        const newproject = await Project.create({
            title: req.body.title,
            discription: req.body.disc,
            name: req.body.user.name,
            username: req.body.user.username,
            domain: req.body.user.domain,
            clg: req.body.user.clg,
            members: req.body.members,
            links: req.body.links,
            visiblity: req.body.visiblity,
        });

        const notification = await Notification.create({
            content: "Congratulations on your new project, and a hearty +10 ranking boost has been added!",
            islink: false,
            username: req.body.user.username
        })
        const entry = [newproject._id, newproject.title];
        await User.updateOne({_id:req.body.user._id}, {
           
            rp: req.body.user.rp + 10,
            $push: { notifications: notification._id }
        })
        await User.updateOne({_id:req.body.user._id}, {
           
            $push: { projects: entry }
        })

        res.status(200).json("success")
    } catch (error) {
        res.status(400).json(error)

    }
}
export const viewproject = async (req, res) => {
    try {
        const project = await Project.findById(req.body.id);
        res.status(200).json(project)
    } catch (error) {
        res.status(400).json(error)

    }
}
function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
  }
  
  function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
  
    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }


export const checkplagariasm = async(req,res)=>{
    try{
        const projects = await Project.find({});
        var highestdisc=0;
        var highesttitle=0;
        projects.forEach((element)=>{
            if(highesttitle < similarity(req.body.title,element.title) ){
                console.log(similarity(req.body.title,element.title))
                highesttitle = similarity(req.body.title,element.title);
            }
        })
        projects.forEach((element)=>{
            if(highestdisc < similarity(req.body.discription,element.discription) ){
                highestdisc = similarity(req.body.discription,element.discription);
            }
        })
        res.status(200).json({highesttitle:highesttitle*100 ,highestdisc:highestdisc*100});
    }catch(error){
        res.status(400).json(error);

    }
}

export const Searchproject = async (req, res) => {
    try {
        const regexPattern = new RegExp(req.body.query, "i");
        const project = await Project.find({  $and: [{ $or: [{ title: { $regex: regexPattern } }, { discription: { $regex: regexPattern } }], visiblity:true}]})

        if (project) {

            res.status(200).json(project)
        }
        else {
            res.status(202).json("")

        }
    } catch (error) {
        res.status(400).json(error)

    }
}

export const like = async (req, res) => {
    try {
        await Project.findByIdAndUpdate(req.body.id, {
            $push: { likes: req.body.user.username }
        })
        const updated = await Project.findByIdAndUpdate(req.body.id, {
            $pull: { dislikes: req.body.user.username }
        })
        const user = await User.findOne({username:updated.username});

        const notification = await Notification.create({
            content: "+1 Ranking Point as Someone has just Liked your project! " + updated.title ,
            islink: false,
            username: user.username
        })
        await User.findByIdAndUpdate(user._id, {
            rp: user.rp + 1,
            $push: { notifications: notification._id }
        })
        res.status(200).json({ likes: updated.likes.length, dislikes: updated.dislikes.length });
    } catch (error) {


        res.status(400).json(error)
    }
}

export const dislike = async (req, res) => {
    try {
        await Project.findByIdAndUpdate(req.body.id, {
            $pull: { likes: req.body.user.username }
        })
        const updated = await Project.findByIdAndUpdate(req.body.id, {
            $push: { dislikes: req.body.user.username }
        })
        res.status(200).json({ likes: updated.likes.length, dislikes: updated.dislikes.length });
    } catch (error) {
        res.status(400).json(error)
    }
}

export const comment = async (req, res) => {
    try {
        const comment = await Comment.create({
            content: req.body.comment,
            username: req.body.user.username,
            projectid: req.body.id
        })
        const project = await Project.findByIdAndUpdate(req.body.id, {
            $push: { comments: comment._id }
        })
        if(comment.username != req.body.user._id){

            const notification = await Notification.create({
                content: "+2 Ranking Point as " + comment.username + " commented on your Project!",
                islink: false,
                username: project.username
            })
            const user = await User.findOne({username:project.username})
            await User.findByIdAndUpdate(user._id, {
                rp: user.rp + 2,
                $push: { notifications: notification._id }
            })
        }
        res.status(200).json(comment._id);
    } catch (error) {
        res.status(200).json(error);

    }
}

export const findcomment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.body.id);
        res.status(200).json(comment);
    } catch (error) {
        res.status(200).json(error);
    }
}