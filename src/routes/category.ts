import { Request, Response } from 'express';
import Category from '../models/category.js';

export const getCategories = async (req: Request, res: Response) => {
    try {
        const { showDeleted, onlyDeleted } = req.query;
        const categories = await Category.getAll(
            showDeleted === 'true',
            onlyDeleted === 'true'
        );
        console.log(categories);
        res.json(categories);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
};

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const numericId = Number(id);
        if (isNaN(numericId)) {
            res.status(400).json({ message: 'Geçersiz ID formatı' });
            return;
        }
        const category = await Category.getById(numericId);
        if (!category) {
            res.status(404).json({ message: "Kategori bulunamadı" });
            return;
        }
        console.log(category);
        res.status(201).json({ message: `${numericId} başarıyla getirildi`, data: category });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
};

export const CreateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description } = req.body;
        if (!name) {
            res.status(400).json({ message: 'Kategori adı zorunludur' });
            return;
        }
        const categoryData = { name, description };

        const category = await Category.create(categoryData);
        console.log(category);
        res.status(201).json({ message: "Kategori başarıyla eklendi", data: category });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const numericId = Number(id);
        if (isNaN(numericId)) {
            res.status(400).json({ message: 'Geçersiz Id formatı' });
            return;
        }
        const { name, description } = req.body;
        const updateData = { name, description };
        const category = await Category.update(numericId, updateData);
        if (!category) {
            res.status(404).json({ message: "Kategori bulunamadı" });
            return;
        }
        console.log(category);
        res.status(202).json({ message: 'Kategori başarıyla güncellendi', data: category });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const numericId = Number(id);
        if (isNaN(numericId)) {
            res.status(400).json({ message: 'Geçersiz Id formatı' });
            return;
        }
        const category = await Category.delete(numericId);
        if (!category) {
            res.status(404).json({ message: "Kategori bulunamadı" });
            return;
        }
        console.log(category);
        res.status(201).json({ message: "Kategori başarıyla silindi", data: category });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
};

import express from 'express';
const router = express.Router();

router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.post('/', CreateCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;