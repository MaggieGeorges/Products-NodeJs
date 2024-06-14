import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { sqlConfig } from '../config';
import mssql from 'mssql';
import { Product, ProductRequest } from '../models/productModel';

export const addProduct = async (req: ProductRequest, res: Response) => {
    try {
        const { name, price, categoryId } = req.body;
        const id = uuidv4(); // Generate a new UUID for the product
        let pool = await mssql.connect(sqlConfig);
        await pool.request()
            .input('id', mssql.VarChar, id)
            .input('name', mssql.VarChar, name)
            .input('price', mssql.Decimal, price)
            .input('categoryId', mssql.VarChar, categoryId) // Update this line
            .execute('addProduct');
        return res.status(201).send('<h1>Product Added</h1>');
    } catch (error) {
        return res.status(500).json(error);
    }
};

  

export const getProducts = async (req: Request, res: Response) => {
    try {
        let pool = await mssql.connect(sqlConfig);
        const products = (await pool.request().execute('getProducts')).recordset as Product[];
        return res.status(200).json(products);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

export const getProduct = async (req: Request<{ id: string }>, res: Response) => {
    try {
        let pool = await mssql.connect(sqlConfig);
        const product = (await pool.request()
            .input('Id', req.params.id)
            .execute('getProduct')).recordset[0] as Product;

        if (product && product.id) {
            return res.status(200).json(product);
        }
        return res.status(404).json({ Message: 'Product not Found!' });
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const updateProduct = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const { name, price, categoryId } = req.body;

        let pool = await mssql.connect(sqlConfig);
        await pool.request()
            .input('Id', id)
            .input('name', name)
            .input('price', price)
            .input('categoryId', categoryId)
            .execute('updateProduct');

        return res.status(200).json({ message: 'Product Updated!' });
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const deleteProduct = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;

        let pool = await mssql.connect(sqlConfig);
        await pool.request()
            .input('Id', id)
            .execute('deleteProduct');

        return res.status(200).json({ Message: 'Product deleted Successfully!!' });
    } catch (error) {
        return res.status(500).json(error);
    }
};
