import { Router } from 'express';
import Comment from '../models/comment.js';
const router = Router();
// Tüm yorumları getir
const getAllComments = async (req, res) => {
    try {
        const { post, commenter } = req.query;
        const comments = await Comment.getAll({
            post: post ? Number(post) : undefined,
            commenter: commenter
        });
        res.json(comments);
    }
    catch (error) {
        res.status(500).json({ error: 'Yorumlar getirilirken bir hata oluştu' });
    }
};
// Belirli bir yorumu getir
const getCommentById = async (req, res) => {
    try {
        const comment = await Comment.getById(Number(req.params.id));
        if (!comment) {
            res.status(404).json({ error: 'Yorum bulunamadı' });
            return;
        }
        res.json(comment);
    }
    catch (error) {
        res.status(500).json({ error: 'Yorum getirilirken bir hata oluştu' });
    }
};
// Yeni yorum oluştur
const createComment = async (req, res) => {
    try {
        const { post_id, content, commenter_name } = req.body;
        if (!post_id || !content || !commenter_name) {
            res.status(400).json({ error: 'Tüm alanlar zorunludur' });
            return;
        }
        const commentData = { post_id, content, commenter_name };
        const comment = await Comment.create(commentData);
        res.status(201).json(comment);
        return;
    }
    catch (error) {
        res.status(500).json({ error: 'Yorum oluşturulurken bir hata oluştu' });
        return;
    }
};
// Yorum güncelle
const updateComment = async (req, res) => {
    try {
        const { content } = req.body;
        const updateData = { content };
        const comment = await Comment.update(Number(req.params.id), updateData);
        if (!comment) {
            res.status(404).json({ error: 'Yorum bulunamadı' });
            return;
        }
        res.json(comment);
        return;
    }
    catch (error) {
        res.status(500).json({ error: 'Yorum güncellenirken bir hata oluştu' });
        return;
    }
};
// Yorum sil
const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.delete(Number(req.params.id));
        if (!comment) {
            res.status(404).json({ error: 'Yorum bulunamadı' });
            return;
        }
        res.json(comment);
        return;
    }
    catch (error) {
        res.status(500).json({ error: 'Yorum silinirken bir hata oluştu' });
        return;
    }
};
router.get('/', getAllComments);
router.get('/:id', getCommentById);
router.post('/', createComment);
router.patch('/:id', updateComment);
router.delete('/:id', deleteComment);
export default router;
