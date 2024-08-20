import express from "express";
import { getAllProducts, productAddController } from "../controllers/product.controller.js";
import { uploadFile } from "../services/multer.js";
const Router = express.Router();

const productAddRouter = Router.post(
  "/add-product/:id",
  uploadFile.fields([
    { name: "productSingleImage", maxCount: 1 },
    { name: "productImages", maxCount: 10 },
  ]),
  productAddController
);
const getAllproductRouter = Router.get("/get-all-product/:id", getAllProducts);

export { productAddRouter, getAllproductRouter };
