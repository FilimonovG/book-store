const {Author, Book } = require('../models/models')

class AuthorService{

    async findAll(){
        return await Author.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
            include: {
                model: Book,
                through: {
                    attributes: []
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            }
        })
    }

    async findById(id){
        return await Author.findOne({
            where: {id},
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
            include: {
                model: Book,
                through: {
                    attributes: []
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            }
        })
    }

    async create(name, imageUrl, description, books){
        const author = await Author.create({
            name: name,
            imageUrl: imageUrl,
            description: description
        })
        books?.map(async bookId=>{
            const book = await Book.findOne({where:{id:bookId}})
            author.addBook(book)
        })
        return author
    }

    async delete(id){
        await Author.destroy({where:{id}})
    }
}

module.exports = new AuthorService()