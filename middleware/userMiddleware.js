const zod = require('zod');
const { Admin, User } = require("../database")

const unameSchema = zod.string().min(5);
const passSchema = zod.string().min(8);
const nameSchema = zod.string().min(1);
const mnSchema = zod.string(10);
const tokenSchema = zod.string(6);
const emailSchema = zod.string().email();
const bbSchema = zod.number();

const userMiddleware = (req, res, next) => {
    const name = req.body.name;
    const mobilenumber = req.body.mobile;
    const username = req.body.username;
    const password = req.body.password;
    const tokenId = req.body.tokenId;
    const email = req.body.email;
    const bankBalance = req.body.bankBalance;

    const userValidation = unameSchema.safeParse(username);
    const passValidation = passSchema.safeParse(password);
    const nameValidation = nameSchema.safeParse(name);
    const mnValidation = mnSchema.safeParse(mobilenumber);
    const tokenValidation = tokenSchema.safeParse(tokenId);
    const emailValidation = emailSchema.safeParse(email);
    const bbValidation = bbSchema.safeParse(bankBalance);
    if (!userValidation.success || !passValidation.success || !nameValidation.success || !mnValidation.success ||
        !tokenValidation.success || !emailValidation.success || !bbValidation.success ) {
        res.json({
            msg: "Wrong input!"
        })
    }
    else {
    next();
}

}
const userAuthMiddleWare = (req, res, next) => {
    const username = req.headers.username;
    const password = req.headers.password;

    User.findOne({
        username: username,
        password: password
    })
        .then(function (value) {
            if (value) {
                next();
            }
            else {
                res.status(403).json({
                    msg: "You are not Authorized"
                })
            }
        })

}
