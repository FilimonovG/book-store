const orderService = require('../services/order.service')

class OrderController{
    async create(req, res, next){
        try {
            const order = await orderService.create(req.body)
            res.json(order)
        }catch (e){
            return next(e)
        }
    }
}

module.exports = new OrderController()