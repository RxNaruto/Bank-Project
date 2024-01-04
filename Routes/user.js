const express=require('express');
const router=express.Router();
const {userMiddleware,userAuthMiddleWare}=require("../middleware/userMiddleware");
const{adminAuthMiddleWare}=require("../middleware/adminMiddleware");
const {User}=require("../database/db");

router.post("/createUser",userMiddleware,async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const name = req.body.name;
    const mobilenumber = req.body.mobile;
    const tokenId = req.body.tokenId;
    const email = req.body.email;
    const bankBalance = req.body.bankBalance;
    await User.create({
        Name: name,
        MobileNumber: mobilenumber,
        username: username,
        password: password,
        tokenId: tokenId,
        email:email,
        BankBalance:bankBalance

    })
    res.json({
        msg:"User Created Successfully"
    })

})
router.get("/getuser",userAuthMiddleWare,async (req,res)=>{
    const response= await User.findOne({
        username:req.headers.username,
        password:req.headers.password
    });
    res.json({
        response: response
    })

})
router.get("/getUsersBB",adminAuthMiddleWare,async (req,res)=>{
    const response =await User.findOne({
        username:req.headers.username,
        password:req.headers.password
    });
    res.json({
        response: response.BankBalance
    })
})

module.exports=router;
