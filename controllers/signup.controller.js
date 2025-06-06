import { 
    registerUserModel,
        sendOtpModel, 
        verifyOtpModel 
        } from "../models/signup.model.js";

export const signupController = async(req, res)=>{
    const {userEmail} = req.body;
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
    res.status(200).json({ message: "Invalid OTP", success:false, userEmail });
}
export const registerUserController = async(req, res)=>{
    const {
            referalCode, 
            dob, 
            userName, 
            password, 
            userEmail
        } = req.body;
         if(userEmail === "" || password === "" || userName === "" || dob === ""){
              return res.status().json({success:false, message:"required fields are empty"});
            }
    const result = await registerUserModel(
                                            userName, 
                                            password, 
                                            userEmail, 
                                            dob, 
                                            referalCode
                                        );
    if(result?.success){
        return res
                .status(200)
                .json({
                        success:true, 
                        message:"user created successfully", 
                        userData:result.user
                    });
    }
    else if (result.message === "duplicate user email") {
      return res
        .status(200)
        .json({ success: false, message: "duplicate user email" });
    }
        return res
          .status(200)
          .json({ 
                    success: false, 
                    message: "User not created DB problem" });
}