const reviewService = require('../services/review.service')
const ApiError = require("../exceptions/Api.error");

class ReviewController{

    async findAll(req, res){
        const reviews = await reviewService.findAll()
        return res.json(reviews)
    }


    async findById(req, res){
        const id = req.params.id
        const review = await reviewService.findById(id)
        return res.json(review)
    }

    async create(req, res, next){
        try {
            const review = await reviewService.create(req.body)
            res.json(review)
        }catch (e){
            return next(e)
        }
    }

    async update(req, res, next){

    }

    async delete(req, res){
        const id = req.params.id
        await reviewService.delete(id)
        res.status(204).json()
    }

    async deleteAll(req, res){
        await reviewService.deleteAll()
        res.status(204).json()
    }
}

module.exports = new ReviewController()