const express = require('express')
const router = express.Router()
const Comment = require('../models/comment')

router.get('/',async (req,res) =>{
    try {
        const Comments = await Comments.getAll(req.query)
        res.json(Comments)
    } catch (error) {
        res.status(400).json({message: 'Hata oldu tekrar deneyiniz'})
    }
})

router.get('/:id',async (req,res)=>{
    try {
        const Comments = await Comments.getById(req.params.id)
        if(!Comments){
            res.status(404)
        }
        res.json(Comments)
    } catch (error) {
        res.status(400).json({message: 'Hata oldu tekrar deneyiniz'})
    }
})

router.post('/',async (req,res) => {
    try {
        const newComment = await Comment.create(req.body)
        res.status(201).json(newComment)
    } catch (error) {
        res.status(400).json({message: 'Hata oldu tekrar deneyiniz'})
    }
})

router.put('/:id',async (req,res) => {
    try {
        const updatedComment = await Comment.update(req,params.id,req.body)
        res.status(201).json(updatedComment)
    } catch (error) {
        res.status(400).json({message: 'Hata oldu tekrar deneyiniz'})
    }
})

router.delete('/:id',async (req,res) => {
    try {
        const deletedComment = await Comment.delete(req,params.id,req.body)
        res.status(202).json(deletedComment)
    } catch (error) {
        res.status(400).json({message: 'Hata oldu tekrar deneyiniz'})
    }
})