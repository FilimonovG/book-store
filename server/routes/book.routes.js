const Router = require('express')
const router = new Router()
const bookController = require('../controllers/book.controller')
const bookValidator = require('../middleware/validators/book.validator')
const auth = require('../middleware/auth.middleware')

router.get('/', bookController.findAll)
router.get('/:id', bookController.findById)
router.post('/', auth("ADMIN"), bookValidator(), bookController.create)
router.put('/:id', auth("ADMIN"), bookController.update)
router.delete('/:id', auth("ADMIN"), bookController.delete)

module.exports = router