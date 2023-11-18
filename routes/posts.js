const express = require('express');
const router = express.Router();
const Post=require("../models/Post");

//Create A Post
router.post("/", async(req,res)=>{
    const newPost=new Post(req.body);
    try{
        const savedPost=await newPost.save();
        res.status(200).json(savedPost);
    }
    catch(err){
        res.status(500).json(err)
    }
})

/*router.put("/:id",async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post.userId===req.body.userId){
    await post.updateOne({$set:req.body});
    res.status(200).json("The post has been updated")
        }
        else{
            res.status(403).json("you can update only your post")
        }
    }
    catch(err){
        res.status(500).json(err);
    }
})*/

//Update A Post
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await Post.updateOne({ _id: req.params.id }, { $set: req.body });
            res.status(200).json("The post has been updated");
        } else {
            res.status(403).json("You can update only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete A Post
router.delete("/:id",async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post.userId==req.body.userId){
    await post.deleteOne();
    res.status(200).json("The post has been deleted")
        }
        else{
            res.status(403).json("you can delete only your post")
        }
    }
    catch(err){
        res.status(500).json(err);
    }
})



/*router.put("/:id/like",async(req,res)=>{
   
    try{
        const post=await Post.findById(req.params.id);
       
       
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{ likes: req.body.userId}});
    res.status(200).json("The Post has Been Liked")
}
else
{
    await post.updateOne({$pull:{likes:req.body.userId}})
    res.status(200).json("The Post has Been Disliked");
}
    }
catch(err){
    res.status(500).json(err);
}
});*/

//Like and Unlike A Post
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post.likes.includes(req.body.userId)) {
            await Post.updateOne({ _id: req.params.id }, { $push: { likes: req.body.userId } });
            res.status(200).json("The Post has been Liked");
        } else {
            await Post.updateOne({ _id: req.params.id }, { $pull: { likes: req.body.userId } });
            res.status(200).json("The Post has been Disliked");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("Error updating likes");
    }
});

//comments
router.post("/:id/comment", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        const newComment = {
            userId: req.body.userId,
            content: req.body.content,
        };

        post.comments.push(newComment);
        await post.save();

        res.status(201).json("Comment added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json("Error adding comment");
    }
});
module.exports = router;