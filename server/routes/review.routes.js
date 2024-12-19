const Router = require('express')
const router = new Router()
const reviewController = require('../controllers/review.controller')

router.get('/', reviewController.findAll)
router.get('/:id', reviewController.findById)
router.post('/', reviewController.create)
router.delete('/:id', reviewController.delete)

module.exports = router