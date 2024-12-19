import UsersModel from "../models/UsersModel.js";
import {TokenEncode} from "../utilities/tokenUtility.js";


export const Registration = async(req,res)=>{

    try{
        let reqBody = req.body; 
        await UsersModel.create(reqBody);
        return res.json({status:"success", "Message":"User registered successfully"})
    }catch(err){
        return res.json({status:"fail", "Message":err.toString()})
    }
    
}

export const Login = async(req,res)=>{
    try{
        let reqBody = req.body; 
        let data = await UsersModel.findOne(reqBody);
        if(data===null){
            return res.json({status:"fail", "Message": "User not found"})
        }
        else{
            // Login success token encode 
            let token = TokenEncode(data['email'], data['_id']);
            return res.json({status:"success", Token: token, "Message": "User login success"})
        }
    }
    catch(err){
        return res.json({status:"fail", "Message":err.toString()})
    }

    return res.json({status:"success", "Message":"User login successfully"})
}

export const ProfileDetails = async(req,res)=>{

    try{
        let user_id = req.headers['user_id'] 
        let data = await UsersModel.findOne({"_id": user_id})
        return res.json({status:"success", "Message":"User Profile Details successfully", data: data})
    }
    catch(err){
        return res.json({status:"fail", "Message":err.toString()})
    }
}

export const AllProfileDetails = async(req,res)=>{

    try{
        let user_id = req.headers['user_id'] 
        let data = await UsersModel.find()
        return res.json({status:"success", "Message":"All User Profile Details Read successful", data: data})
    }
    catch(err){
        return res.json({status:"fail", "Message":err.toString()})
    }
}

export const ProfileUpdate = async(req,res)=>{

    try{
        let reqBody = req.body;
        let user_id = req.headers['user_id'];
        await UsersModel.updateOne({"_id": user_id}, reqBody)
        return res.json({status:"success", "Message":"User Profile Update successfully"})
    }
    catch(err){
        return res.json({status:"fail", "Message":err.toString()});
    }
    
} 

export const DeleteProfile = async(req,res)=>{
    try{
        let id = req.params.id;
        let user_id = req.headers['user_id'];
        await UsersModel.deleteOne({_id: id});
        return res.json({status:"success", "Message":"Delete Profile successful"})
    }
    catch(err){
        return res.json({status:"fail", "Message":err.toString()});
    }
}

export const EmailVerify = async(req,res)=>{

    try{
        let email = req.params.email; 
        let data = await UsersModel.findOne({email: email})
        if(data==null){
        return res.json({status: "fail", "Message": "User email does not exist"})
        }
        else{
            let code = Math.floor(100000 + Math.random()*900000); 
            let EmailTo = data['email']; 
            let EmailText = "Your code is " + code; 
            let EmailSubject = "Task manager verification code"; 
            await SendEmail(EmailTo, EmailText, EmailSubject); 
        
            await UsersModel.updateOne({email: email}, {otp: code}); 
            return res.json({status:"success", Message:"Verification code sent successfully. Please check the email."}) 
        }    
    }
    catch(err){
        return res.json({status:"fail", "Message": err.toString()});
    }
    
}

export const CodeVerify = async(req,res)=>{
    try{
        let email = req.params.email; 
        let code = req.params.code;
        let data = await UsersModel.findOne({email: email, otp: code});
        if(data==null){
            return res.json({status: "fail", message: "Wrong email/ verification code"})
        }
        else{
            return res.json({status: "success", message: "Verification successful"})
        }
    }
    catch(err){
        return res.json({status:"fail", "Message": err.toString()});
    }
}

export const ResetPassword = async(req,res)=>{
    try{
        let reqBody = req.body;
        let data = await UsersModel.findOne({email: reqBody['email'], otp: reqBody['code']});
        if(data==null){
            return res.json({status: "fail", message: "Wrong email/ verification code"})
        }
        else{
            await UsersModel.updateOne({email: reqBody['email']}, {
                otp: "0", password: reqBody['password']
            });
            return res.json({status: "success", message: "Password reset is successful"})
        }
    }
    catch(err){
        return res.json({status:"fail", "Message": err.toString()});
    }
}