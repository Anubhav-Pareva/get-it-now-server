import { Router } from "express";
import {
  getProductController,
  getProductsController,
  getSearchProductController,
} from "../../controllers/product.controller.js";

const productRoutes = Router();

productRoutes.get("/getproducts", getProductsController);
productRoutes.get("/getproduct", getProductController);
productRoutes.get("/getsearchproducts", getSearchProductController);

export default productRoutes;
