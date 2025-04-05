import { Router } from 'express';
import Post from '../models/post.js';
const router = Router();
// Tüm gönderileri getir
const getAllPosts = async (req, res) => {
    try {
        const { category, status, showDeleted, onlyDeleted } = req.query;
        const posts = await Post.getAll({
            category: category ? Number(category) : undefined,
            status: status,
            showDeleted: showDeleted === 'true',
            onlyDeleted: onlyDeleted === 'true'
        });
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ error: 'Gönderiler getirilirken bir hata oluştu' });
    }
};
// Belirli bir gönderiyi getir
const getPostById = async (req, res) => {
    try {
        const post = await Post.getById(Number(req.params.id));
        if (!post) {
            res.status(404).json({ error: 'Gönderi bulunamadı' });
            return;
        }
        res.json(post);
        return;
    }
    catch (error) {
        res.status(500).json({ error: 'Gönderi getirilirken bir hata oluştu' });
        return;
    }
};
// Yeni gönderi oluştur
const createPost = async (req, res) => {
    try {
        const { category_id, title, content } = req.body;
        if (!category_id || !title || !content) {
            res.status(400).json({ error: 'Tüm alanlar zorunludur' });
            return;
        }
        const postData = { category_id, title, content };
        const post = await Post.create(postData);
        res.status(201).json(post);
    }
    catch (error) {
        res.status(500).json({ error: 'Gönderi oluşturulurken bir hata oluştu' });
    }
};
// Gönderi güncelle
const updatePost = async (req, res) => {
    try {
        const { title, content, published_at } = req.body;
        const updateData = {
            title,
            content,
            published_at: published_at ? new Date(published_at) : undefined
        };
        const post = await Post.update(Number(req.params.id), updateData);
        if (!post) {
            res.status(404).json({ error: 'Gönderi bulunamadı' });
            return;
        }
        res.json(post);
    }
    catch (error) {
        res.status(500).json({ error: 'Gönderi güncellenirken bir hata oluştu' });
    }
};
// Gönderi sil (soft delete)
const deletePost = async (req, res) => {
    try {
        const post = await Post.delete(Number(req.params.id));
        if (!post) {
            res.status(404).json({ error: 'Gönderi bulunamadı' });
            return;
        }
        res.json(post);
    }
    catch (error) {
        res.status(500).json({ error: 'Gönderi silinirken bir hata oluştu' });
    }
};
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
export default router;
