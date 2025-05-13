import { generateOTP, verifyOTP } from "../helper.js";
import OtpModel from "../mongoose-model/otpmodel.js";
import UserModel from "../mongoose-model/userModel.js";
import { sendOtpMail } from "../nodeMailer-config/mail-transporter.js";
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
          return {success:true, isUserExist: true, userDetail: isUserExist};
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
