const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
 userId:{
    type:String,
    required:true
 },
 desc:{
    type:String,
    max:500,

 },
 img:{
    type:String
 },
 likes: {
   type: Array, // Assuming userIds are strings
   default: [],    // Default value is an empty array
 },

 comments: [{
   userId: {
       type: String,
       required: true,
   },
   content: {
       type: String,
       max: 500,
   },
   createdAt: {
       type: Date,
       default: Date.now,
   },
}],
 

}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);