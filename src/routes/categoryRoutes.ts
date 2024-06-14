import { Router } from "express";
import { addCategory, getCategory, getCategoriesWithProducts } from "../controllers/categoryController";

const categoryRouter = Router();

categoryRouter.get("", getCategory);
categoryRouter.post("", addCategory);
categoryRouter.get("/:id/products", getCategoriesWithProducts); // New endpoint for category with products

export default categoryRouter;
