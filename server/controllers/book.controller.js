const bookService = require('../services/book.service')
const {validationResult} = require('express-validator')
const ApiErrors = require("../exceptions/Api.error");
const ApiError = require("../exceptions/Api.error");

class BookController{

    async findAll(req, res){
        const books = await bookService.findAll()
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
           const book = await bookService.create(req.body)
           res.json(book)
       }catch (e){
           return next(e)
       }
    }

    async delete(req){
        const id = req.params.id
        await bookService.delete(id)
    }
}

module.exports = new BookController()