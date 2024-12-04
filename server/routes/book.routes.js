const Router = require('express')
const router = new Router()
const bookController = require('../controllers/book.controller')
const bookValidator = require('../middleware/validators/book.validator')

router.get('/', bookController.findAll)
router.get('/:id', bookController.findById)
router.post('/', bookValidator(), bookController.create)
// router.put('/', bookController.updateBook)
router.delete('/clear', bookController.deleteAll)
router.delete('/:id', bookController.delete)

module.exports = router