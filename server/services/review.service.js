const {Book, User, Review} = require('../models/models')
const ApiError = require("../exceptions/Api.error");
const sequelize = require('../config/db')

class ReviewService{

    async findAll(){
        return await Review.findAll({
            attributes: {
                exclude: ["updatedAt"]
            },
            include: [
                {
                    model: Book,
                    attributes: [
                        'id',
                        'title'
                    ]
                },
                {
                    model: User,
                    attributes: [
                        'id',
                        'email'
                    ]
                }
            ]
        })
    }

    async findById(id){
        return await Review.findOne({
            where: {id},
            attributes: {
                exclude: ["updatedAt"]
            },
            include: [
                {
                    model: Book,
                    attributes: [
                        'id',
                        'title'
                    ]
                },
                {
                    model: User,
                    attributes: [
                        'id',
                        'name'
                    ]
                }
            ]
        })
    }

    async create({title, description, rating, userId, bookId}){
        return await sequelize.transaction(async () => {
            const user = await User.findOne({where:{id:userId}})
            if (!user){
                throw ApiError.NotFoundError(`User with id '${userId}' not found`)
            }
            const book = await Book.findOne({where:{id:bookId}})
            if (!book){
                throw ApiError.NotFoundError(`Book with id '${bookId}' not found`)
            }
            const review = await Review.create({
                title: title,
                description: description,
                rating: rating,
            })
            await user.addReview(review)
            await book.addReview(review)
            return review
        })
    }

    async update(id, data){

    }

    async delete(id){
        await Review.destroy({where:{id}})
    }

}

module.exports = new ReviewService()