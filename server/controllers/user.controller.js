const userService = require('../services/user.service')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/Api.error');

class UserController{

    async registration(req, res, next){
        try {
            const errors =  validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email, password} = req.body
            const userData = await userService.registration(email, password)
            return res.json(userData)
        }catch (e){
            return next(e)
        }
    }

    async login(req, res, next){
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken,{maxAge:30*24*60*60*1000, httpOnly:true, sameSite: 'strict'})
            return res.json(userData)
        }catch (e){
            next(e)
        }
    }

    async logout(req, res, next){
        try {
            const {refreshToken} = req.cookies
            if (refreshToken){
                await userService.logout(refreshToken)
            } 
            res.clearCookie('refreshToken')
        }catch (e){
            next(e)
        }
    }

    async activate(req, res, next){
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        }catch (e){
            next(e)
        }
    }

    async refresh(req, res, next){
        try {
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken,{maxAge:30*24*60*60*1000, httpOnly:true, sameSite: 'strict'})
            return res.json(userData)
        }catch (e){
            next(e)
        }
    }
}

module.exports = new UserController()