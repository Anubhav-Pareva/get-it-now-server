import { Router } from "express";
import {
  getCategoryProductController,
  getProductController,
  getProductsController,
  getSearchProductController,
} from "../../controllers/product.controller.js";

const productRoutes = Router();

productRoutes.get("/getproducts", getProductsController);
productRoutes.get("/getproduct", getProductController);
productRoutes.get("/getcategoryproducts", getCategoryProductController);
productRoutes.get("/getsearchproducts", getSearchProductController);

export default productRoutes;
