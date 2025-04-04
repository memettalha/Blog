import { Router, Request, Response } from 'express';
import Comment, { CreateCommentDTO, UpdateCommentDTO } from '../models/comment.js';

const router = Router();

// Tüm yorumları getir
router.get('/', async (req: Request, res: Response) => {
  try {
    const { post, commenter } = req.query;
    const comments = await Comment.getAll({
      post: post ? Number(post) : undefined,
      commenter: commenter as string
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Yorumlar getirilirken bir hata oluştu' });
  }
});

// Belirli bir yorumu getir
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const comment = await Comment.getById(Number(req.params.id));
    if (!comment) {
      return res.status(404).json({ error: 'Yorum bulunamadı' });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Yorum getirilirken bir hata oluştu' });
  }
});

// Yeni yorum oluştur
router.post('/', async (req: Request, res: Response) => {
  try {
    const { post_id, content, commenter_name } = req.body;
    if (!post_id || !content || !commenter_name) {
      return res.status(400).json({ error: 'Tüm alanlar zorunludur' });
    }
    const commentData: CreateCommentDTO = { post_id, content, commenter_name };
    const comment = await Comment.create(commentData);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Yorum oluşturulurken bir hata oluştu' });
  }
});

// Yorum güncelle
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const updateData: UpdateCommentDTO = { content };
    const comment = await Comment.update(Number(req.params.id), updateData);
    if (!comment) {
      return res.status(404).json({ error: 'Yorum bulunamadı' });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Yorum güncellenirken bir hata oluştu' });
  }
});

// Yorum sil
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const comment = await Comment.delete(Number(req.params.id));
    if (!comment) {
      return res.status(404).json({ error: 'Yorum bulunamadı' });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Yorum silinirken bir hata oluştu' });
  }
});

export default router; 