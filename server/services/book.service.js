const {Book, Author, Category} = require('../models/models')
const ApiError = require("../exceptions/Api.error");
const sequelize = require('../config/db')

class BookService{

    async findAll(){
        return await Book.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
            include: {
                model: Author,
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
        return await Book.findOne({
            where: {id},
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
            include: {
                model: Author,
                through: {
                    attributes: []
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            }
        })
    }

    async create({title, price, imageUrl, authors, categoryId}){
        await sequelize.transaction(async () => {
            const category = await Category.findOne({where: {id: categoryId}})
            if (!category) {
                throw ApiError.NotFoundError(`Category with id='${categoryId}' not found`)
            }
            return await Book.create({
                title: title,
                price: price,
                imageUrl: imageUrl,
                categoryId: categoryId
            }).then(async (book) => {
                for (let authorId of authors) {
                    const author = await Author.findOne({where: {id: authorId}})
                    if (!author) {
                        throw ApiError.NotFoundError(`Author with id='${authorId}' not found`)
                    }
                    book.addAuthor(author)
                }
            })
        })
    }

    async delete(id){
        await Book.destroy({where:{id}})
    }
}

module.exports = new BookService()