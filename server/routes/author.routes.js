const Router = require('express')
const router = new Router()
const authorController = require('../controllers/author.controller')

router.get('/', authorController.findAll)
router.get('/brief', authorController.findAllShort)
router.get('/:id', authorController.findById)
router.post('/', authorController.create)
// router.put('/', authorController.updateAuthor)
router.delete('/:id', authorController.delete)

module.exports = router