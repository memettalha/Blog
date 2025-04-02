import express from 'express'
const router = express.Router()
import Post from '../models/post'

router.get('/',async (req,res) => {
    try {
        const posts = await Post.getAll(req.query)
        req.json(posts)
    } catch (error) {
        res.status(400).json({message:'Hata oldu tekrar deneyiniz'})
    }
})

router.get('::/id',async (req,res) => {
    try {
        const post =await Post.getById(req.params.id)
        if(!post){
            res.status(404)
        }
        res.json(post)
    } catch (error) {
        res.status(400).json({message:'Hata oldu tekrar deneyiniz'})
    }
})

router.post('/', async (req,res) => {
    try {
        const newPost = Post.create(req.body)
        res.status(201).json(newPost)
    } catch (error) {
        res.status(400).json({message:'Hata oldu tekrar deneyiniz'})
    }
})

router.put('/:id',async (req,res) => {
    try {
        const updatedPost = await Post.update(req.params.id,req.body)
        res.json(updatedPost)
    } catch (error) {
        
    }
})

router.delete('/:id',async(req,res) => {
    try {
        const deletedPost = await Post.delete(req.params.id)
        res.status(202).json(deletedPost)
    } catch (error) {
        res.status(400).json({message:'Hata oldu tekrar deneyiniz'})
    }
})


module.exports = router