const {Book, Author, Category, Book_Author, Review} = require('../models/models')
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
            include: [
                {
                    model: Author,
                    through: {
                        attributes: []
                    },
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    },
                },
            ]
        })
    }

    async create({title, price, imageUrl, description, authors, categoryId}){
        return await sequelize.transaction(async () => {
            return await Category.findOne({where: {id: categoryId}})
                .then(async category=>{
                    if (!category){
                        throw ApiError.NotFoundError(`Category with id '${categoryId}' not found`)
                    }
                    return await Book.create({
                        title: title,
                        price: price,
                        imageUrl: imageUrl,
                        discount: 0,
                        description: description,
                        rating: 0,
                        number_of_ratings: 0,
                        categoryId: categoryId,

                    }).then(async book=>{
                        for (const authorId of authors) {
                            const author = await Author.findOne({where:{id:authorId}})
                            if(!author){
                                throw ApiError.NotFoundError(`Author with id '${authorId}' not found`)
                            }
                            await book.addAuthor(author)
                        }
                        return book
                    })
                })
        })
    }

    async update(id, data){
        return await sequelize.transaction(async () => {
            return await Book.findOne({where:{id}})
                .then(async book=>{
                    if (!book){
                        throw ApiError.NotFoundError(`Book with id '${id}' not found`)
                    }
                    return await book.save(data)
                })
        })
    }

    async delete(id){
        await Book.destroy({where:{id}})
    }

    async deleteAll(id){
        const books = await Book.findAll()
        for (let book of books){
            await Book.destroy({where: {id: book.id}})
        }
    }

}

module.exports = new BookService()