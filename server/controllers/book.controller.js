const bookService = require('../services/book.service')
const {validationResult} = require('express-validator')
const ApiError = require("../exceptions/Api.error");

class BookController{

    async findAll(req, res){
        const books = await bookService.findAll()
        res.json(books)
    }

    async findAllWithDetails(req, res){
        const books = await bookService.findAllWithDetails()
        res.json(books)
    }

    async findById(req, res){
        const id = req.params.id
        const book = await bookService.findById(id)
        res.json(book)
    }

    async create(req, res, next){
       try {
           const errors = validationResult(req)
           if (!errors.isEmpty()) {
               return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
           }
           const {image} = req.files
           const {title, price, description, categoryId, authors} = req.body
           const book = await bookService.create(title, price, image, description, categoryId, authors)
           res.json(book)
       }catch (e){
           return next(e)
       }
    }

    async update(req, res, next){
        try {
            const id = req.params.id
            const {image} = req.files
            const book = await bookService.update(id, {...req.body, image})
            res.json(book)
        }catch (e){
            return next(e)
        }
    }

    async delete(req, res){
        const id = req.params.id
        await bookService.delete(id)
        res.status(204).json()
    }

    async deleteAll(req, res){
        await bookService.deleteAll()
        res.status(204).json()
    }
}

module.exports = new BookController()