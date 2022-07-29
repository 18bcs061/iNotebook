const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator"); ////////////////to use this first install express-validator
var bcrypt = require("bcryptjs"); ///////////////////to use this bcrypt we need to install this first by npm i bcryptjs
var jwt = require("jsonwebtoken"); /////////////////////to use this we need to install this first npm i jsonwebtoken
const JWT_SECRET = "KFVJKDVDFKjbd";
var fetchuser = require("../middleware/fetchuser");
router.get("/", async (req, res) => {
  //   console.log("pk llllllll");
  ///////////////////////we can insert the data by this method also////////////
  //
  // const user = User({
  // name: "abhishek",
  // });
  // user.save();
  ////////////////////////to make password secure////////////////////
  // const pass = "abhis";
  // const salt = await bcrypt.genSalt(10);
  // const secPass = await bcrypt.hash(pass, salt);
  // console.log(secpass)
  /////////////we can insert data by this method also///////////////////////////
  // const user = await User.create({
  //   name: "abhish",
  //   password: secPass,
  // });
  // console.log("this is ", user);
  /////////////////to generate auth token////////////////////
  // const data = {
  //   user: {
  //     id: user.id,
  //   },
  // };
  // const authtoken = jwt.sign(data, JWT_SECRET);
  // console.log(authtoken);
  ////////////////////this is used for fetching data from mongo/////////////////
  const useer = await User.findOne({ name: "abhish" });
  res.json(useer);
  // console.log(useer);
  // res.json({
  //   name: "abhishek kumar",
  //   staus: "ok",
  // });
});
////////////////////////////////////////////////Validation only work on post request/////////////////////////
// router.post(
//   "/",
//   [
//     body("name", "Enter a valid name").isLength({ min: 5 }),
//     body("username","enter a valid email").isEmail(),
//   ],
//   (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//         User.create({
//           username: req.body.username,
//           name: req.body.name,
//         }).then((user) => res.json(user));

//   }
// );
////////////////////////////////////////////////Login End POint////////////////////////////////////////////////
// router.post(
//   "/login",
//   [
//     body("password", "Enter a valid password").isLength({ min: 5 }),
//     body("email","enter a valid email").isEmail(),
//   ],
//    async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
// const {email,password}=req.body;
// try {
//   let user=await User.findOne({email});
//   if(!user){
//     return res.status(400).json({error:"please try to login with valid creadentials"});
//   }
//   const passwordCompare=await bcrypt.compare(password,user.password);
//   if(!passwordCompare){
//     return res
//       .status(400)
//       .json({ error: "please try to login with valid creadentials" });
//   }
//   const data={
//     user:{
//       id:user.id
//     }
//   }
//   const authtoken=jwt.sign(data,JWT_SECRET);
//   res.json(authtoken)
// } catch (error) {
//   console.log(error.message);
//   res.status(500).send("some error occured");
// }

//   }
// );

////////////////////////////////////Get Logged In details by auth Token//////////////////////////////
//router.post(
//   "/loginauth",fetchuser,
//    async (req, res) => {
// try {
//   userId=req.user.id
//   const user=await User.findById(userId).select("-password")
// res.send(user)
// } catch (error) {
//   console.error(error.message)
//   res.status(500).send("intrenal error");
// }
//   }
// );

module.exports = router;
