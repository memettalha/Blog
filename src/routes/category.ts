import express, { Request, Response, RequestHandler } from 'express';
const router = express.Router();
import Category from '../models/category.js';

interface CategoryBody {
  name: string;
  description?: string;
}

router.get('/', (async (req: Request, res: Response) => {
  try {
    const showDeleted = req.query.showDeleted === 'true' ? 'true' : 'false';
    const categories = await Category.getAll({ showDeleted });
    res.json(categories);
  } catch (error) {
    console.error('Kategoriler getirilirken hata:', error);
    res.status(500).json({ message: 'Kategoriler getirilirken bir hata oluştu' });
  }
}) as RequestHandler);

router.get('/:id', (async (req: Request, res: Response) => {
  try {
    const category = await Category.getById(Number(req.params.id));
    if (!category) {
      return res.status(404).json({ message: 'Kayıt yok' });
    }
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: 'Hata oldu tekrar deneyiniz' });
  }
}) as RequestHandler);

router.post('/', (async (req: Request, res: Response) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: 'Hata oldu tekrar deneyiniz' });
  }
}) as RequestHandler);

router.patch('/:id', (async (req: Request, res: Response) => {
  try {
    const updatedCategory = await Category.update(Number(req.params.id), req.body);
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: 'Hata oldu tekrar deneyiniz' });
  }
}) as RequestHandler);

router.delete('/:id', (async (req: Request, res: Response) => {
  try {
    const deletedCategory = await Category.delete(Number(req.params.id));
    res.json(deletedCategory);
  } catch (error) {
    res.status(400).json({ message: 'Hata oldu tekrar deneyiniz' });
  }
}) as RequestHandler);

export default router;