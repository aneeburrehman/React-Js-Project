const express = require('express');
const router = express.Router();
const User=require("../models/User");


//Register
router.post('/register', async(req, res) => {
 const newUser=new User({
    username:req.body.username,
    email:req.body.email,
    password:req.body.password
 })
  try{
    const user=await newUser.save();
    res.status(200).json(user);
  }
  catch (err){
    console.log(err)
  }
});

/*router.post('/login',async(req,res)=>{
    try{
        const user=await User.findone({email:req.body.email});
    !user && res.status().json("usernotfound")
    }
    catch(err){
        console.log(err);
    }
})*/
router.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
  
      // Check if user is not found
      if (!user) {
        return res.status(404).json("User not found");
      }
  
      // Placeholder for password verification
      const isPasswordValid = req.body.password === user.password;
  
      // Check if password is not valid
      if (!isPasswordValid) {
        return res.status(401).json("Invalid credentials");
      }
  
      // Respond with success message
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json("Internal Server Error");
    }
  });
  
  

module.exports = router;