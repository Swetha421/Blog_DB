const {Schema}=require('mongoose');
const {model}=require('mongoose');
const blogschema=new Schema({
    BlogID:{type:String,required:true},
    title:{type:String,required:true}, 
    author:{type:String,required:true},
    content:{type:String,required:true}
})


const blogmodel=model("blogs",blogschema);
module.exports=blogmodel;