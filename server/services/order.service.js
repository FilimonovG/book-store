const sequelize = require("../config/db");
const {Order, User, Book, Order_Book} = require("../models/models");
const ApiError = require("../exceptions/Api.error");

class OrderService{
    async create({total_price, userId, books}){
        return await sequelize.transaction(async () => {
            const user = await User.findOne({where:{id:userId}})
            if (!user){
                throw ApiError.NotFoundError(`User with id='${userId}' not found`)
            }
            const order = await Order.create({
                total_price: total_price,
                userId: userId
            })
            for (let parsedBook of JSON.parse(books)){
                const book = await Book.findOne({where:{id:parsedBook.id}})
                if (!book){
                    throw ApiError.NotFoundError(`Book with id='${book.id}' not found`)
                }
                await Order_Book.create({
                    orderId: order.id,
                    bookId: book.id,
                    quantity: parsedBook.quantity
                })
            }
        })
    }
}

module.exports = new OrderService()
