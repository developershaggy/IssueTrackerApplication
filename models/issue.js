const mongoose =require('mongoose');

const issueSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    labels:[String],
    description:{
        type:String
    },
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project'
    }
  },{
    timestamps:true
  });

const Issue=mongoose.model('Issue',issueSchema);
module.exports=Issue;