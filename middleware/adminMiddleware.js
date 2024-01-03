const zod = require('zod');
const {Admin} = require("../database")

const unameSchema=zod.string().min(5);
const passSchema=zod.string().min(8);

const adminMiddleware=(req,res,next)=>{
    const username=req.body.username;
    const password=req.body.password;
    const userValidation=unameSchema.safeParse(username);
    const passValidation=passSchema.safeParse(password);
    if(!userValidation.success || !passValidation.success){
        res.json({
            msg:"Wrong input!"
        })
    }
    else{
        next();
    }

}
const adminAuthMiddleWare=(req,res,next)=>{
    const username=req.headers.username;
    const password=req.headers.password;

    Admin.findOne({
        username: username,
        password: password
    })
    .then(function(value){
        if(value){
            next();
        }
        else{
            res.status(403).json({
                msg:"You are not Authorized"
            })
        }
    })
    
}
module.exports={
    adminMiddleware,
    adminAuthMiddleWare

}