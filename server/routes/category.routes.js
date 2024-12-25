const Router = require('express')
const router = new Router()
const genreController = require('../controllers/category.controller')
const auth = require('../middleware/auth.middleware')

router.get('/', genreController.findAll)
router.get('/books', genreController.findAllWithBooks)
router.get('/:id', genreController.findById)

router.post('/', auth("ADMIN"), genreController.create)

router.put('/:id', auth("ADMIN"), genreController.update)

router.delete('/:id', auth("ADMIN"), genreController.delete)

module.exports = router