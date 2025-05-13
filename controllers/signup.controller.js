import { 
        sendOtpModel, 
        verifyOtpModel 
        } from "../models/signup.model.js";
import OtpModel from "../mongoose-model/otpmodel.js";

export const signupController = async(req, res)=>{
    const {userEmail} = req.body;
    console.log(userEmail);
    await OtpModel.deleteMany({ email: userEmail });
    res.json({ message: "User created successfully", userEmail });
}

export const sendotpController = async(req, res)=>{
    const {userEmail} = req.body;
    const result = await sendOtpModel(userEmail);
    if(result){
        return res.status(200).json({ message: "OTP sent successfully", success:true, userEmail });
    }
    res.status(500).json({ message: "OTP sent unsuccessful", success:false, userEmail });
}
export const verifyOtpController = async(req, res)=>{
    const { userEmail, otp } = req.body;
    const result = await verifyOtpModel(userEmail, otp);
    if(result.success){
        return res.status(200).json({ 
                                      message: "OTP verified successfully", 
                                      success:true, 
                                      userEmail, 
                                      isUserExist:result.isUserExist, 
                                      userDetail: result.userDetail
                                    });
    }
    res.status(401).json({ message: "Invalid OTP", success:false, userEmail });
}