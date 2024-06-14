
import { Router } from "express";
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct} from "../controllers/productControllers";



const productSRouter = Router()

productSRouter.post("", addProduct)
productSRouter.get("", getProducts)
productSRouter.get("/:id",  getProduct)
productSRouter.put("/:id", updateProduct)
productSRouter.delete("/:id",  deleteProduct)



export default productSRouter