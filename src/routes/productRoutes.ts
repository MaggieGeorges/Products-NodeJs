
import { Router } from "express";
import { addProduct, filterProducts, getProduct, getProducts, updateProduct} from "../controllers/productControllers";



const productSRouter = Router()

productSRouter.post("", addProduct)
productSRouter.get("/filter", filterProducts); 
productSRouter.get("", getProducts)
productSRouter.get("/:id", getProduct)
productSRouter.put("/:id", updateProduct)




export default productSRouter