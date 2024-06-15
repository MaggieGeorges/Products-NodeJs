import { Request } from "express"

export interface Product {
        id: number,
        name: string,
        price: number,      
}

interface addProduct {
    name: string,
    price: number,   
}

export interface ProductRequest extends Request{
    body:addProduct
}