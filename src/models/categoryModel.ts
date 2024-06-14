
import { Request } from "express"

export interface CategoryRequest extends Request{
body:{
    name:string
}
}



export interface Category {
    id:string
    name:string
}
