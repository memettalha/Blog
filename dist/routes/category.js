import { Router } from 'express';
import Category from '../models/category.js';
const router = Router();
// Tüm kategorileri getir
const getAllCategories = async (req, res) => {
    try {
        const { showDeleted, onlyDeleted } = req.query;
        const categories = await Category.getAll(showDeleted === 'true', onlyDeleted === 'true');
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ error: 'Kategoriler getirilirken bir hata oluştu' });
    }
};
// Belirli bir kategoriyi getir
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.getById(Number(req.params.id));
        if (!category) {
            res.status(404).json({ error: 'Kategori bulunamadı' });
            return;
        }
        res.json(category);
    }
    catch (error) {
        res.status(500).json({ error: 'Kategori getirilirken bir hata oluştu' });
        return;
    }
};
// Yeni kategori oluştur
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            res.status(400).json({ error: 'Kategori adı zorunludur' });
            return;
        }
        const categoryData = { name, description };
        const category = await Category.create(categoryData);
        res.status(201).json(category);
        return;
    }
    catch (error) {
        res.status(400).json({ error: 'Kategori oluşturulurken bir hata oluştu' });
        console.log(error);
        return;
    }
};
// Kategori güncelle
const updateCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const updateData = { name, description };
        const category = await Category.update(Number(req.params.id), updateData);
        if (!category) {
            res.status(404).json({ error: 'Kategori bulunamadı' });
            return;
        }
        res.json(category);
    }
    catch (error) {
        res.status(400).json({ error: 'Kategori güncellenirken bir hata oluştu' });
        return;
    }
};
// Kategori sil (soft delete)
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.delete(Number(req.params.id));
        if (!category) {
            res.status(404).json({ error: 'Kategori bulunamadı' });
            return;
        }
        res.json(category);
    }
    catch (error) {
        res.status(500).json({ error: 'Kategori silinirken bir hata oluştu' });
        return;
    }
};
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', createCategory);
router.patch('/:id', updateCategory);
router.delete('/:id', deleteCategory);
export default router;
