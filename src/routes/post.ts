import { Router, Request, Response } from 'express';
import Post, { CreatePostDTO, UpdatePostDTO } from '../models/post.js';

const router = Router();

// Tüm gönderileri getir
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, status, showDeleted, onlyDeleted } = req.query;
    const posts = await Post.getAll({
      category: category ? Number(category) : undefined,
      status: status as 'published' | 'draft' | 'all',
      showDeleted: showDeleted === 'true',
      onlyDeleted: onlyDeleted === 'true'
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Gönderiler getirilirken bir hata oluştu' });
  }
});

// Belirli bir gönderiyi getir
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const post = await Post.getById(Number(req.params.id));
    if (!post) {
      return res.status(404).json({ error: 'Gönderi bulunamadı' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Gönderi getirilirken bir hata oluştu' });
  }
});

// Yeni gönderi oluştur
router.post('/', async (req: Request, res: Response) => {
  try {
    const { category_id, title, content } = req.body;
    if (!category_id || !title || !content) {
      return res.status(400).json({ error: 'Tüm alanlar zorunludur' });
    }
    const postData: CreatePostDTO = { category_id, title, content };
    const post = await Post.create(postData);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Gönderi oluşturulurken bir hata oluştu' });
  }
});

// Gönderi güncelle
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { title, content, published_at } = req.body;
    const updateData: UpdatePostDTO = {
      title,
      content,
      published_at: published_at ? new Date(published_at) : undefined
    };
    const post = await Post.update(Number(req.params.id), updateData);
    if (!post) {
      return res.status(404).json({ error: 'Gönderi bulunamadı' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Gönderi güncellenirken bir hata oluştu' });
  }
});

// Gönderi sil (soft delete)
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const post = await Post.delete(Number(req.params.id));
    if (!post) {
      return res.status(404).json({ error: 'Gönderi bulunamadı' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Gönderi silinirken bir hata oluştu' });
  }
});

export default router; 