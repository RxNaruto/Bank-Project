const mongoose= require('mongoose');
mongoose.connect("mongodb+srv://naruto:jVSNMMGwfSVPzHXV@cluster0.78poq1d.mongodb.net/Bank")

const AdminSchema= new mongoose.Schema({
    username: String,
    password: String
});

const UserSchema= new mongoose.Schema({
    Name: String,
    MobileNumber: String,
    username: String,
    password: String,
    tokenId: String,
    email: String,
    BankBalance: Number,
    

})

const Admin=mongoose.model('Admin',AdminSchema);
const User =mongoose.model('User',UserSchema);

module.exports={
    Admin,
    User
}