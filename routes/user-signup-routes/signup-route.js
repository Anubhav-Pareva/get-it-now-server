import { Router } from "express";
const userRouter = Router();
userRouter.post("/signup", (req, res) => {
    const userEmail = req.body;
    console.log(userEmail);
    res.json({ message: "User created successfully", userEmail });
});
export default userRouter;