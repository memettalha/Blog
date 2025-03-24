const express = require('express')
const router = express.Router()
const Category = require('../models/category')

router.get('/',async (req,res) => {
    try {
        const categories = await Category.getAll()
        res.json(categories)
    } catch (error) {
        res.status(400).json({message:'Hata oldu tekrar deneyiniz'})
    }
})

router.get('::/id',async (req,res) => {
    try {
        const category =await Category.getById(req.params.id)
        if(!category){
            return res.status(400).json({message:'Kayıt yok'})
        }
        res.json(category)
    } catch (error) {
        res.status(400).json({message:'Hata oldu tekrar deneyiniz'})  
    }
})

router.post('./',async(req,res) => {
    try {
        const newCategory = await Category.create(req.body)
        res.status(201).json(newCategory)
    } catch (error) {
        res.status(400).json({message:'Hata oldu tekrar deneyiniz'})
    }
})

router.patch('./',async (req,res) => {
    try {
        const updatedCategory =await Category.update(req.params.id,req.body)
        res.json(updatedCategory)
    } catch (error) {
       res.status(400).json({message:'Hata oldu tekrar deneyiniz'})
    }
})
router.delete('./',async (req,res) => {
    try {
        const deletedCategory =await Category.update(req.params.id)
        res.json(deletedCategory)
    } catch (error) {
       res.status(400).json({message:'Hata oldu tekrar deneyiniz'})
    }
})
module.exports = router