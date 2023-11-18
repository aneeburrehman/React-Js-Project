// In routes/api.js or a similar file
const express = require('express');
const router = express.Router();
const userDb=require ("../models/User");
router.put("/:id",(req,res)=>{
    const {userId}=req.body;
    console.log( userId);
    userDb.findByIdAndUpdate(userId,{
        username: req.body.username,
          email: req.body.email,
          password:req.body.password,
          profilepicture: req.body.profilepicture,
          followers: req.body.followers,
          followings: req.body.followings,
          isadmin: req.body.isadmin,
          desc: req.body.desc,
          city:req.body.city,
          from: req.body.from,
        
          relationhip:req.body.relationship
         

    }).then((user) => {
        res.send(user);
    }).catch((error) => {
        res.status(500).send("You can update only yours");
    });
    });


router.delete("/:id",async(req,res)=>{
    try {
        await userDb.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
})
    



       
router.get('/:id', async (req, res) => {
    try {
        const user = await userDb.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/:id/follow", async (req, res) => {
    if (req.body.userId != req.params.id) {
        try {
            const user = await userDb.findById(req.params.id); // Use userDb
            const currentUser = await userDb.findById(req.body.userId); // Use userDb
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json("user has been followed");
            } else {
                res.status(403).json("already following this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You cannot follow yourself");
    }
});

router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId != req.params.id) {
        try {
            const user = await userDb.findById(req.params.id); // Use userDb
            const currentUser = await userDb.findById(req.body.userId); // Use userDb
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json("user has been unfollowed");
            } else {
                res.status(403).json("You dont folow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You cannot unfollow yourself");
    }
});

module.exports = router;
