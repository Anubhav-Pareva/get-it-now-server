import express from 'express';
import userRouter from './routes/user-signup-routes/signup-route.js';
import productRoutes from "./routes/product-actions-routes/product-actions-route.js"
import bodyParser from 'body-parser';
import connectDB from './db.js';
import cartRoutes from './routes/cart-actions-routes/cart-action-route.js';
const app = express();
connectDB();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/cart", cartRoutes);
app.use("/products", productRoutes);
app.use("/user", userRouter);
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Get It Now Server!', status:"server is up" });
});
app.listen(4200, ()=>{
    console.log('Server is running on port 4200');
})