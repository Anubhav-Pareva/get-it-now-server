import { Router } from "express";
import { 
        registerUserController,
         sendotpController, 
         signupController, 
         verifyOtpController 
        } from "../../controllers/signup.controller.js";


const userRouter = Router();


userRouter.post("/signup", signupController);
userRouter.post("/sentotp", sendotpController);
userRouter.post("/verifyotp", verifyOtpController);
userRouter.post("/registeruser", registerUserController);

export default userRouter;