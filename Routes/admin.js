const express=require('express');
const router=express.Router();
const {adminMiddleware,adminAuthMiddleWare}=require("../middleware/adminMiddleware");
const {Admin,User}=require("../middleware/adminMiddleware");

router.post("/createAdmin",adminMiddleware,async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    await Admin.create({
        username: username,
        password: password
    })
    res.json({
        msg:"Admin Created Successfully"
    })

})
router.get("/getAdmin",adminAuthMiddleWare,async (req,res)=>{
    const response= await Admin.find({});
    res.json({
        response: response
    })

})
router.get("/getUsers",adminAuthMiddleWare,async (req,res)=>{
    const response =await User.find({});
    res.json({
        response: response
    })
})

router.get("/getUser/:TokenId",adminAuthMiddleWare,async(req,res)=>{
    
    const response=await User.findOne({
        tokenId: req.params.TokenId
    })


})