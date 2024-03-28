const mongoose = require('mongoose');
//  const url="mongodb://127.0.0.1:27017/issue-tracker-db";
const uri= process.env.MONGO_URI;
async function main() {
  await mongoose.connect(uri);
  
}

main()
.then(()=>{
    console.log("Sucessfully Connected to Database");
})
main().catch(err => console.log("Error Connecting To Database ",err));
