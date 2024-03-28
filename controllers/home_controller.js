const Project= require('../models/project');


module.exports.home=async function(req,res){

    try{
        let projects=await Project.find().sort('-createdAt');
        //console.log("projects are "+projects);
        return res.render('../views/home',{
            title:"Issue Tracker Home",
            projects:projects
        });
    }catch(err){
        console.log("Error finding projects ",err);
        return res.render('../views/home',{
            title:"Issue Tracker Home",
        });
    }
   
}


module.exports.createProject=async function(req,res){
    //console.log(req.body);
    try{
        let project=await Project.create({
            title:req.body.title,
            author:req.body.author,
            description:req.body.description
        });
       // console.log(typeof req);

        if(req.xhr){
          //  console.log("Hello request");
            return res.status(200).json({
                data:{
                    project:project,
                    message:"Project Created!"
                }
            });
        }

        return res.redirect('back');
       // console.log(project);
    }catch(err){
        console.log("Error creating a project in the db", err);
        return res.redirect('back');
    }
   
}