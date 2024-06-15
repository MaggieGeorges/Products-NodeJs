import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { sqlConfig } from '../config';
import mssql from 'mssql';
import { Product, ProductRequest } from '../models/productModel';

export const addProduct = async (req: ProductRequest, res: Response) => {
    try {
        const { name, price } = req.body;
        const id = uuidv4(); // Generate a new UUID for the product
        let pool = await mssql.connect(sqlConfig);
        await pool.request()
            .input('id', mssql.VarChar, id)
            .input('name', mssql.VarChar, name)
            .input('price', mssql.Decimal, price)
            .execute('addProduct');
        return res.status(201).send('<h1>Product Added</h1>');
    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json(error);
    }
};


// Paginated List Endpoint
export const getProducts = async (req: Request, res: Response) => {
    try {
        const { page, pageSize } = req.query;
        const pageNumber = parseInt(page as string) || 1; // default to page 1 if not provided
        const limit = parseInt(pageSize as string) || 10; // default to 10 items per page if not provided
        const offset = (pageNumber - 1) * limit;

        let pool = await mssql.connect(sqlConfig);
        const totalCountQuery = 'SELECT COUNT(*) AS totalCount FROM products';
        const totalCountResult = await pool.request().query(totalCountQuery);
        const totalCount = totalCountResult.recordset[0].totalCount;

        const productsQuery = `SELECT * FROM products ORDER BY id OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`;
        const productsResult = await pool.request().query(productsQuery);
        const products = productsResult.recordset as Product[];

        const totalPages = Math.ceil(totalCount / limit);

        return res.status(200).json({
            products,
            totalPages,
            currentPage: pageNumber,
            pageSize: limit,
            totalCount
        });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};



export const getProduct = async (req: Request<{ id: string }>, res: Response) => {
    try {
        let pool = await mssql.connect(sqlConfig);
        const result = await pool.request()
            .input('Id', mssql.VarChar, req.params.id)
            .execute('getProduct');
        const product = result.recordset[0] as Product;

        if (product) {
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
        const { name, price} = req.body;

        let pool = await mssql.connect(sqlConfig);
        const result = await pool.request()
            .input('Id', mssql.VarChar, id)
            .input('name', mssql.VarChar, name)
            .input('price', mssql.Decimal, price)
            .execute('updateProduct');


        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Product not found!' });
        }

        return res.status(200).json({ message: 'Product Updated!' });
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json(error);
    }
};

export const deleteProduct = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;

        let pool = await mssql.connect(sqlConfig);
        const result = await pool.request()
            .input('Id', mssql.VarChar, id)
            .execute('deleteProduct');
        
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ Message: 'Product not found!' });
        }

        return res.status(200).json({ Message: 'Product deleted Successfully!!' });
    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json(error);
    }
};

// Filtering Endpoint
export const filterProducts = async (req: Request, res: Response) => {
    try {
        const { minPrice, maxPrice, productName } = req.query;

        // Validate inputs
        if (!minPrice || !maxPrice || !productName) {
            return res.status(400).json({ message: 'Invalid input parameters' });
        }

        // Convert to numbers
        const min = parseFloat(minPrice as string);
        const max = parseFloat(maxPrice as string);

        // Check if valid numbers
        if (isNaN(min) || isNaN(max)) {
            return res.status(400).json({ message: 'Invalid price range' });
        }

        // Input validation for productName can be added here

        let pool = await mssql.connect(sqlConfig);
        const products = (await pool.request()
            .input('MinPrice', mssql.Decimal, min)
            .input('MaxPrice', mssql.Decimal, max)
            .input('ProductName', mssql.VarChar, productName)
            .execute('filterProducts')).recordset as Product[];

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        return res.status(200).json(products);
    } catch (error: any) {
        // Log the error for debugging
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
