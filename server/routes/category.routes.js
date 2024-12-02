const Router = require('express')
const router = new Router()
const genreController = require('../controllers/category.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.get('/', genreController.findAll)
router.get('/books', genreController.findAllWithBooks)
router.get('/:id', genreController.findById)
router.post('/', genreController.create)
router.delete('/:id', authMiddleware("ADMIN"), genreController.delete)

module.exports = router