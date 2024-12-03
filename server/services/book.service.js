const {Book, Author, Category, Book_Author} = require('../models/models')
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
        try {
            return await sequelize.transaction(async t => {
                const category = await Category.findOne(
                    {where:{id:categoryId}},
                    { transaction: t }
                )
                if (!category) {
                    throw ApiError.NotFoundError(`Category with id='${categoryId}' not found`)
                }
                const book = await Book.create({
                    title: title,
                    price: price,
                    imageUrl: imageUrl,
                    categoryId: categoryId
                },{ transaction: t })
                authors.map(async authorId => {
                    const author = await Author.findOne(
                    {where:{id:authorId}},
                    { transaction: t }
                    )
                    if (!author) {
                        throw ApiError.NotFoundError(`Author with id='${authorId}' not found`)
                    }
                    book.addAuthor(author)
                })
                return book
            })
        }catch (e){
            console.log(e)
        }

    }

    async delete(id){
        await Book.destroy({where:{id}})
    }
}

module.exports = new BookService()