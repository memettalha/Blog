import { Request, Response } from 'express';
import Comment from '../models/comment.js';

export const getComments = async (req: Request, res: Response) => {
    try {
        const { post, commenter, showDeleted, onlyDeleted } = req.query;
        const comments = await Comment.getAll({
            post: post ? Number(post) : undefined,
            commenter: commenter as string | undefined,
            showDeleted: showDeleted === 'true',
            onlyDeleted: onlyDeleted === 'true'
        });
        console.log(comments);
        res.json(comments);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
};

export const getCommentById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const numericId = Number(id);
        if (isNaN(numericId)) {
            res.status(400).json({ message: 'Geçersiz ID formatı' });
            return;
        }
        const comment = await Comment.getById(numericId);
        if (!comment) {
            res.status(404).json({ message: "Yorum bulunamadı" });
            return;
        }
        console.log(comment);
        res.status(201).json({ message: `${numericId} başarıyla getirildi`, data: comment });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
};

export const CreateComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { post_id, content, commenter_name } = req.body;
        if (!post_id || !content || !commenter_name) {
            res.status(400).json({ message: 'Tüm alanlar zorunludur' });
            return;
        }
        const commentData = { post_id, content, commenter_name };

        const comment = await Comment.create(commentData);
        console.log(comment);
        res.status(201).json({ message: "Yorum başarıyla eklendi", data: comment });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
};

export const updateComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const numericId = Number(id);
        if (isNaN(numericId)) {
            res.status(400).json({ message: 'Geçersiz Id formatı' });
            return;
        }
        const { content } = req.body;
        const updateData = { content };
        const comment = await Comment.update(numericId, updateData);
        if (!comment) {
            res.status(404).json({ message: "Yorum bulunamadı" });
            return;
        }
        console.log(comment);
        res.status(202).json({ message: 'Yorum başarıyla güncellendi', data: comment });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
};

export const deleteComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const numericId = Number(id);
        if (isNaN(numericId)) {
            res.status(400).json({ message: 'Geçersiz Id formatı' });
            return;
        }
        const comment = await Comment.delete(numericId);
        if (!comment) {
            res.status(404).json({ message: "Yorum bulunamadı" });
            return;
        }
        console.log(comment);
        res.status(201).json({ message: "Yorum başarıyla silindi", data: comment });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
};

import express from 'express';
const router = express.Router();

router.get('/', getComments);
router.get('/:id', getCommentById);
router.post('/', CreateComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router; 