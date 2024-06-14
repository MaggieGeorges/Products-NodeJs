import { Request } from "express"

export interface Product {
        id: number,
        name: string,
        price: number,
        categoryId: number
    
   
}

interface addProduct {
    id: number,
    name: string,
    price: number,
    categoryId: number   
   
}

export interface ProductRequest extends Request{
    body:addProduct
}