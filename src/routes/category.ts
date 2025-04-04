import { Router, Request, Response } from 'express';
import Category, { CreateCategoryDTO, UpdateCategoryDTO } from '../models/category.js';

const router = Router();

// Tüm kategorileri getir
router.get('/', async (req: Request, res: Response) => {
  try {
    const { showDeleted, onlyDeleted } = req.query;
    const categories = await Category.getAll(
      showDeleted === 'true',
      onlyDeleted === 'true'
    );
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Kategoriler getirilirken bir hata oluştu' });
  }
});

// Belirli bir kategoriyi getir
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const category = await Category.getById(Number(req.params.id));
    if (!category) {
      return res.status(404).json({ error: 'Kategori bulunamadı' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Kategori getirilirken bir hata oluştu' });
  }
});

// Yeni kategori oluştur
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Kategori adı zorunludur' });
    }
    const categoryData: CreateCategoryDTO = { name, description };
    const category = await Category.create(categoryData);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Kategori oluşturulurken bir hata oluştu' });
  }
});

// Kategori güncelle
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const updateData: UpdateCategoryDTO = { name, description };
    const category = await Category.update(Number(req.params.id), updateData);
    if (!category) {
      return res.status(404).json({ error: 'Kategori bulunamadı' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Kategori güncellenirken bir hata oluştu' });
  }
});

// Kategori sil (soft delete)
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const category = await Category.delete(Number(req.params.id));
    if (!category) {
      return res.status(404).json({ error: 'Kategori bulunamadı' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Kategori silinirken bir hata oluştu' });
  }
});

export default router;