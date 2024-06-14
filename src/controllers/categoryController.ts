import {Request,Response,RequestHandler, response} from 'express'
import {v4 as uid} from 'uuid'
import { sqlConfig } from '../config'
import mssql from 'mssql'
import { Category, CategoryRequest } from '../models/categoryModel'


export const addCategory = async (req: CategoryRequest, res: Response) => {
    try {
        const id = uid();
        const { name } = req.body;

        let pool = await mssql.connect(sqlConfig);
        await pool.request()
            .input('Id', id)
            .input('Name', name)
            .execute('addCategory');

        res.status(201).json({ message: "Category Added!" });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

export const getCategory = async (req: Request, res: Response) => {
    try {
        let pool = await mssql.connect(sqlConfig);
        let categories = (await pool.request().execute('getCategory')).recordset as Category[];

        if (categories.length === 0) {
            return res.status(200).json({ message: "No Category found, kindly add one!" });
        }

        return res.status(200).json(categories);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

export const getCategoriesWithProducts = async (req: Request, res: Response) => {
    try {
        let pool = await mssql.connect(sqlConfig);
        const result = await pool.request().execute('getCategoriesWithProducts');

        const categoriesWithProducts = result.recordset;

        if (categoriesWithProducts.length === 0) {
            return res.status(404).json({ message: 'No categories found!' });
        }

        return res.status(200).json(categoriesWithProducts);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

