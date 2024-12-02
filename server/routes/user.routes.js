const Router = require('express')
const router = new Router()
const userController = require('../controllers/user.controller')
const auth = require('../middleware/auth.middleware')
const {body} = require('express-validator')


router.post('/registration', body('email').isEmail(), body('password').isLength({min:8, max:32}), userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.post('/refresh', userController.refresh)

module.exports = router