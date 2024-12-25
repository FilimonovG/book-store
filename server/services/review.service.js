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
        const review = await Review.findOne({
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
                        'email'
                    ]
                }
            ]
        })
        return review
    }

    async create({title, description, rating, userId, bookId}){
        return await sequelize.transaction(async () => {
            const user = await User.findOne({where:{id:userId}})
            if (!user){
                throw ApiError.NotFoundError(`User with id '${userId}' not found`)
            }
            const book = await Book.findOne({where:{id:bookId}, include:{model:Review}})
            if (!book){
                throw ApiError.NotFoundError(`Book with id '${bookId}' not found`)
            }
            const newReview = await Review.create({
                title: title,
                description: description,
                rating: rating,
            })
            await user.addReview(newReview)
            await book.addReview(newReview)
            book.number_of_ratings += 1
            let total_rating = newReview.rating
            book.reviews.map(review=>{
                 total_rating += review.rating
             })
            book.rating = total_rating / book.number_of_ratings
            await book.save()
            return newReview
        })
    }

    async update(id, data){

    }

    async delete(id){
        await Review.destroy({where:{id}})
    }

    async deleteAll(){
        const reviews = await Review.findAll()
        for (let review of reviews){
            await Review.destroy({where:{id:review.id}})
        }
        const books = await Book.findAll()
        for (let book of books){
            book.number_of_ratings = 0
            book.rating = 0
            await book.save()
        }

    }

}

module.exports = new ReviewService()