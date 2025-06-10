import { Router } from "express";
import { 
            addToCartController, 
            clearCartController, 
            getCartController, 
            removeFromCartController 
        } from "../../controllers/cart.controller.js";

const cartRoutes = Router();

cartRoutes.get("/", getCartController);
cartRoutes.post("/addtocart", addToCartController);
cartRoutes.delete("/deletefromcart", removeFromCartController);
cartRoutes.get("/clearcart", clearCartController)
export default cartRoutes;
