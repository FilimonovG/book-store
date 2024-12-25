const Router = require('express')
const router = new Router()
const userController = require('../controllers/user.controller')
const auth = require('../middleware/auth.middleware')
const userValidator = require('../middleware/validators/user.validator')

router.get('/', userController.findAll)
router.get('/activate/:link', userController.activate)
router.get('/:id', userController.findById)

router.post('/registration', userValidator(), userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/refresh', userController.refresh)

router.put('/:id', auth('USER'), userController.update)

router.delete('/:id', auth('USER'), userController.delete)


module.exports = router