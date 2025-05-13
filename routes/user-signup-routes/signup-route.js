import { Router } from "express";
import { 
         sendotpController, 
         signupController, 
         verifyOtpController 
        } from "../../controllers/signup.controller.js";


const userRouter = Router();


userRouter.post("/signup", signupController);
userRouter.post("/sentotp", sendotpController);
userRouter.post("/verifyotp", verifyOtpController);

export default userRouter;