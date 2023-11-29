const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

const registerUser = async (req,res) =>{
    try{
        const {username, email, password } = req.body;
        const userExist = await userModel.findOne({email : req.body.email});
        if(userExist){
            res.json({message : "email address is already exist",status : false})
        }
        else{
            const hashpassword = await bcrypt.hash(password,10);
            const newUser = await userModel.create({
                username,email,password : hashpassword
            })
            delete newUser.password;
            if(newUser){
                res.json({message : "User Registerd successfully",status : true,data : newUser});
            }
            else{
                res.json({message : "Requested data is not valid, Please try it again",status : false});
            }
        }
    }
    catch(error){
        console.log(error);
    }
}

module.exports = { registerUser };