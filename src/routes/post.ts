import { Request, Response } from 'express';
import Post from '../models/post.js';

export const getPosts = async (req: Request, res: Response) => {
    try {
        const { category, status, showDeleted, onlyDeleted } = req.query;
        const posts = await Post.getAll({
            category: category ? Number(category) : undefined,
            status: status as 'draft' | 'published' | undefined,
            showDeleted: showDeleted === 'true',
            onlyDeleted: onlyDeleted === 'true'
        });
        console.log(posts);
        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
};

export const getPostById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const numericId = Number(id);
        if (isNaN(numericId)) {
            res.status(400).json({ message: 'Geçersiz ID formatı' });
            return;
        }
        const post = await Post.getById(numericId);
        if (!post) {
            res.status(404).json({ message: "Gönderi bulunamadı" });
            return;
        }
        console.log(post);
        res.status(201).json({ message: `${numericId} başarıyla getirildi`, data: post });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
};

export const CreatePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { category_id, title, content } = req.body;
        if (!category_id || !title || !content) {
            res.status(400).json({ message: 'Tüm alanlar zorunludur' });
            return;
        }
        const postData = { category_id, title, content };

        const post = await Post.create(postData);
        console.log(post);
        res.status(201).json({ message: "Gönderi başarıyla eklendi", data: post });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
};

export const updatePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const numericId = Number(id);
        if (isNaN(numericId)) {
            res.status(400).json({ message: 'Geçersiz Id formatı' });
            return;
        }
        const { title, content, published_at } = req.body;
        const updateData = { title, content, published_at };
        const post = await Post.update(numericId, updateData);
        if (!post) {
            res.status(404).json({ message: "Gönderi bulunamadı" });
            return;
        }
        console.log(post);
        res.status(202).json({ message: 'Gönderi başarıyla güncellendi', data: post });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const numericId = Number(id);
        if (isNaN(numericId)) {
            res.status(400).json({ message: 'Geçersiz Id formatı' });
            return;
        }
        const post = await Post.delete(numericId);
        if (!post) {
            res.status(404).json({ message: "Gönderi bulunamadı" });
            return;
        }
        console.log(post);
        res.status(201).json({ message: "Gönderi başarıyla silindi", data: post });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
};

import express from 'express';
const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', CreatePost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router; 