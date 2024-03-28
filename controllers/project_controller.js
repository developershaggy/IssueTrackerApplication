const Project= require('../models/project');
const Issue= require('../models/issue');
module.exports.home=async function (req,res){
   // console.log(req.query);
   const projectId=req.query.projectId;
  // console.log(projectId);
    try{
        let project=await Project.findById(projectId).populate({
            path:'issues',
            options:{
                sort:{'createdAt':-1}
            }
        });
        //console.log(project);
        //console.log(project.issues);
        //also get the issues as an array and render them
        return res.render('../views/project',{
            title:"Project Detials",
            project:project,
            issues:project.issues
        });
    }catch(err){
        console.log("Error getting project for issues page",err);
        return res.redirect('back');
    }
    
}



module.exports.createIssue=async function(req,res){
    //console.log(req.body);
    //create an issue, add it to the project's issues array
    try{
        let project=await Project.findById(req.body.project);
        //console.log(project);
        let issue=await Issue.create({
            title:req.body.title,
            author:req.body.name,
            labels:req.body.labels,
            description:req.body.description,
            projectId:req.body.project
        });
        //console.log(issue);
        project["issues"].push(issue);
        //update the project
        project.save();
        if(req.xhr){
          //  console.log("Xhr request");
            return res.status(200).json({
                data:{
                    issue:issue,
                    message:"Issue created successfully"
                }
            });
        }
    }catch(err){
        console.log("Error creating an Issue ",err);
    } 
    return res.redirect('back');
}