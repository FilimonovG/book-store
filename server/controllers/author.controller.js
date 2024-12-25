const authorService = require('../services/author.service')

class AuthorController {

    async findAll(req, res){
        const authors = await authorService.findAll()
        res.json(authors)
    }

    async findAllShort(req, res){
        const authors = await authorService.findAllShort()
        res.json(authors)
    }

    async findById(req, res){
        const id = req.params.id
        const author = await authorService.findById(id)
        res.json(author)
    }

    async create(req, res){
        const {name, imageUrl, description, books} = req.body
        const author = await authorService.create(name, imageUrl, description, books)
        res.json(author)
    }

    async delete(req, res){
        const id = req.params.id
        await authorService.delete(id)
    }
}

module.exports = new AuthorController()