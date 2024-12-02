const categoryService = require('../services/category.service')

class CategoryController {

    async findAll(req, res){
        const categories = await categoryService.findAll()
        res.status(200).json(categories)
    }

    async findAllWithBooks(req, res){
        const categories = await categoryService.findAllWithBooks()
        res.status(200).json(categories)
    }

    async findById(req, res, next){
        try {
            const id = req.params.id
            const category = await categoryService.findById(id)
            res.status(200).json(category)
        }catch (e){
            next(e)
        }
    }

    async create(req, res, next){
        try {
            const category = await categoryService.create(req.body)
            res.status(201).json(category)
        }catch (e){
            next(e)
        }
    }

    async delete(req, res){
        const id = req.params.id
        await categoryService.delete(id)
        res.status(204).json()
    }
}

module.exports = new CategoryController()