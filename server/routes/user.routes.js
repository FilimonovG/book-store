const Router = require('express')
const router = new Router()
const userController = require('../controllers/user.controller')
const auth = require('../middleware/auth.middleware')
const userValidator = require('../middleware/validators/user.validator')


router.post('/registration', userValidator(), userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.post('/refresh', userController.refresh)

module.exports = router