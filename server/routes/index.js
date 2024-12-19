const Router = require('express')
const router = new Router()

const userRouter = require('./user.routes')
const bookRouter = require('./book.routes')
const reviewRouter = require('./review.routes')
const authorRouter = require('./author.routes')
const categoryRouter = require('./category.routes')


router.use('/user', userRouter)
router.use('/book', bookRouter)
router.use('/review', reviewRouter)
router.use('/author', authorRouter)
router.use('/category', categoryRouter)

module.exports = router