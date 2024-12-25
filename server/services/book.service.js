const {Book, Author, Category, Book_Author, Review} = require('../models/models')
const ApiError = require("../exceptions/Api.error");
const sequelize = require('../config/db')
const path = require('path');

class BookService{

    async findAll(){
        return await Book.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
            include:
            [
                {
                    model: Author,
                    through: {
                        attributes: []
                    },
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                },
                {
                    model:Category,
                    attributes:{
                        exclude: ["createdAt", "updatedAt"]
                    }
                }
            ]
        })
    }

    async findAllWithDetails(){
        return await Book.findAll({
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
                    }
                },
                {
                    model: Review,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                },
                {
                    model: Category,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                }
            ]
        })
    }

    async findById(id){
        const book =  await Book.findOne({
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
                        exclude: ["updatedAt"]
                    },
                },
                {
                    model: Review,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                },
                {
                    model: Category,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                }
            ]
        })
        return book
    }

    async create(title, price, image, description, categoryId, authors){
        return await sequelize.transaction(async () => {
            return await Category.findOne({where: {id: categoryId}})
                .then(async category=>{
                    if (!category){
                        throw ApiError.NotFoundError(`Category with id '${categoryId}' not found`)
                    }
                    await image.mv(path.resolve(__dirname, '..', 'static/books', image.name))
                    return await Book.create({
                        title: title,
                        price: price,
                        imageUrl: process.env.API_URL + '/books/' + image.name,
                        description: description,
                        discount: 0,
                        rating: 0,
                        number_of_ratings: 0,
                        categoryId: categoryId,
                        weight: 200,
                        coverType: 'Мягкий переплёт',
                        pagesAmount: 140
                    }).then(async book=>{
                        const author = await Author.findOne({where:{id:authors}})
                        if(!author){
                            throw ApiError.NotFoundError(`Author with id '${authors}' not found`)
                        }
                        await book.addAuthor(author)
                        return book
                    })
                })
        })
    }

    async update(id, data){
        return await sequelize.transaction(async () => {
            const book = await Book.findOne({where:{id}, include:{model:Author}})
            if (!book){
                throw ApiError.NotFoundError(`Book with id='${id}' not found`)
            }

            if (data.image){
                data.image = process.env.API_URL + '/books/' + data.image.name
            }

            if (data.categoryId){
                const category = await Category.findOne({where:{id:data.categoryId}})
                if (!category){
                    throw ApiError.NotFoundError(`Category with id='${data.categoryId}' not found`)
                }
                await book.setCategory(category)
            }

            if (data.authors){
                for (let authorId of data.authors){
                    const author = await Author.findOne({where:{id:authorId}})
                    if(!author){
                        throw ApiError.NotFoundError(`Author with id='${authorId}' not found`)
                    }
                    data.authors[data.authors.indexOf(authorId)] = author
                }
                await book.setAuthors(data.authors)
            }

            return await book.update(data)
        })
    }

    async delete(id){
        await Book.destroy({where:{id}})
    }

    async deleteAll(){
        const books = await Book.findAll()
        for (let book of books){
            await Book.destroy({where: {id: book.id}})
        }
    }

}

module.exports = new BookService()