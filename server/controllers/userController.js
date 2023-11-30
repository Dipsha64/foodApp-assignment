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

const loginUser = async (req,res) =>{
    try{
        console.log("req login",req.body);
        const { email , password } = req.body;
        const isUserExist = await userModel.findOne({email});
        console.log("isUserExist...",isUserExist);
        if(isUserExist){
            // const hashPaswrd = await bcrypt.compare(req.body.password,isUserExist.password);
            bcrypt.compare(req.body.password, isUserExist.password, (err, data) => {
                console.log("BCRYPT PASWD" , req.body.password , isUserExist.password);
                if (data) {
                    console.log("DATAAAAAA",data);
                    let obj = {"_id": isUserExist._id , "username" : isUserExist.username , "email" : isUserExist.email}
                    res.json({message : "login successfully",status : true , data : obj});
                }
                else {
                    res.json({message : "Incorrect email & password, Please try it again",status : false});
                }
            })
        }
        else{
            res.json({message : "Incorrect email & password, Please try it again",status : false});
        }
    }
    catch(error){
        console.log(error);
    }
}

module.exports = { registerUser, loginUser };