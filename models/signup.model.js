
import { hashPassword } from "../bcrypt-config/bcrypt.config.js";
import { generateReferralCode } from "../crypto-config/referalCode.config.js";
import { generateOTP, verifyOTP } from "../helper.js";
import OtpModel from "../mongoose-model/otpmodel.js";
import UserModel from "../mongoose-model/userModel.js";
import { sendLoginMail, sendOtpMail } from "../nodeMailer-config/mail-transporter.js";
export const signupModel = async () => {};

export const sendOtpModel = async (userEmail) => {
  try {
    const otp = generateOTP();
    const otpExist = await OtpModel.find({ email: userEmail});
    if (otpExist.length > 0) {
       const updateResult =  await OtpModel.updateOne({ email: userEmail }, { otp: otp });
       if(updateResult){
        const result = await sendOtpMail(userEmail, otp);
        console.log(otp);
        if (result) {
          return true;
        }
       }
     }
    else{
        const otpResult = await OtpModel.create({ email: userEmail, otp: otp });
        if(otpResult){
            const result = await sendOtpMail(userEmail, otp);
            console.log(otp);
            if (result) {
              return true;
            }
        }
    }
    return false;
  } catch (error) {
    console.log("Error in sending OTP: ", error);
    return false;
  }
};

export const verifyOtpModel = async (userEmail, inputOTP) => {
  try {
    const otpResult = await OtpModel.findOne({ email: userEmail });
    const isUserExist = await UserModel.findOne({ email: userEmail });
    if (otpResult) {
      const result = verifyOTP(inputOTP, otpResult.otp);
      if (result) {
        if (isUserExist) {
            const loginMailResult = await sendLoginMail(userEmail);
            if(loginMailResult){
                return {
                  success: true,
                  isUserExist: true,
                  userDetail: isUserExist,
                };
            }
            return {success:true, isUserExist: true, userDetail: isUserExist, message:"login mail not send"};
        }
        return {success:true, isUserExist: false, userDetail: null};
      }
    }
    return {success:false};
  } catch (error) {
    console.log("Error in verifying OTP: ", error);
    return false;
  }
};
export const registerUserModel = async (
  userName,
  password,
  userEmail,
  dob,
  referalCode
) => {
  try{
    const isExist = await UserModel.findOne({email:userEmail});
    if(isExist){
      return {success:false, message:"duplicate user email"};
    }
    const userReferalCode = await generateReferralCode(userName, dob);
    const hashedPassword = await hashPassword(password);
    const result = await UserModel.create({
                                            name:userName, 
                                            email:userEmail, 
                                            password:hashedPassword, 
                                            referralCode:userReferalCode, 
                                            DOB:dob});
    if(result){
      return {success:true, message:"User created successfully", user:result};
    }
    return {success:false, message:"User not created DB problem"}
  }
  catch(error){
      console.log("in registration api", error);
  }
};
