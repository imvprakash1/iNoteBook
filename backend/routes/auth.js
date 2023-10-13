const express = require("express");
const User = require("../models/User");
const { body, query, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')
const JWT_SECRETKEY="mysecretkey";

//Creating User using POST: api/auth/createuser, doesn't require auth
router.post(
  "/createuser",
  [body("name").isLength({ min: 3 }), body("email").isEmail()],
  async (req, res) => {
    let success=false;
    const result = validationResult(req);
    if (result.isEmpty()) {
      try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
          return res
            .status(400)
            .json({success,
              error: "The email already exists, please enter unique email!",
            });
        }
        const salt= await bcrypt.genSalt();
        const secPass=await bcrypt.hash(req.body.password,salt)
        user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
        });
        const data={
          user:{id:user.id}
        }
        const authToken=jwt.sign(data, JWT_SECRETKEY);
        success=true;
        return res.status(200).json({success,authToken});
      } catch (error) {
        console.log(error.message);
        return res.status(500).json({success, error: "Some issue occured!" });
      }
    }
    return res.status(400).json({success, error: result.array() });
  }
);

//Creating Authentication using POST: api/auth/login
router.post('/login',[body("email","Please enter valid email").isEmail(),body("password","Password cannot be empty").notEmpty()],async(req,res)=>{
  const result = validationResult(req);
  let success=false;
  if (result.isEmpty()) {
    try {
      const {email,password}=req.body;
      let user= await User.findOne({email});
      if(!user){
        return res.status(400).json({success,error:`User with email: ${email} does not exist, please create a user.`})
      }
      let isValidPassword= await bcrypt.compare(password,user.password)
      if(!isValidPassword){
        return res.status(400).json({success,error:"Please enter valid password!"})
      }
      const data={
        user:{id:user.id}
      }
      const authToken=jwt.sign(data, JWT_SECRETKEY);
      success=true;
      return res.json({success,authToken});
  } catch (error) {
      console.log(error.message);
      return res.status(500).json({ success,error: "Some issue occured!" });
  }
  }
  return res.status(400).json({ error: result.array() });
})

//Creating Get user details by POST, login required
router.post('/getuser',fetchuser,async(req,res)=>{
  let success=false;
    try {
      const userid=req.user.id;
      let user=await User.findById(userid).select("-password");
      res.json({success,user})
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({success, error: "Some issue occured!" });
    }
  }
)
module.exports = router;
