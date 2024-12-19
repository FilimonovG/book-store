const uuid = require('uuid')
const bcrypt = require('bcrypt')
const mailService = require('./mail.service')
const {User} = require('../models/models')
const tokenService = require('./token.service')
const UserDto = require('../dtos/user.dto')
const ApiError = require('../exceptions/Api.error')

class UserService{

    async findAll(){
        return await User.findAll()
    }

    async registration(email, password){
        const candidate = await User.findOne({where:{email}})
        if(candidate){
            throw ApiError.BadRequest("Почта занята")
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const activationLink = uuid.v4()
        const user = await User.create({email, password:hashPassword, activationLink})
        await  mailService.sendActivationMail(email, `${process.env.API_URL}/api/users/activate/${activationLink}`)
        return this.getUserData(user);
    }

    async login(email, password){
        const user = await User.findOne({where:{email}})
        if(!user){
            throw ApiError.BadRequest("Пользователь не найден")
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals){
            throw ApiError.BadRequest('Неверный логин или пароль')
        }
        return this.getUserData(user);
    }

    async activate(activationLink){
        const user = await User.findOne({where:{activationLink}})
        if (!user){
            throw ApiError.BadRequest('Некорректная ссылка')
        }
        user.isActivated = true
        await user.save()
    }

    async logout(refreshToken) {
        return await tokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if(!refreshToken){
            throw ApiError.UnauthorizedError("Отсутствует токен")
        }
        const userData = tokenService.validateToken(refreshToken, process.env.JWT_REFRESH_SECRET)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb){
            throw ApiError.UnauthorizedError("Некорректный токен")
        }
        const email = userData.email
        const user = await User.findOne({where:{email}})
        return this.getUserData(user);
    }

    async getUserData(user){
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return{...tokens, user: userDto}
    }

    async update(id, {username, password}){
        const user = await User.findOne({where:{id}})
        if(!user){
            throw ApiError.NotFoundError(`User with id '${id}' not found`)
        }
        user.save(user)
    }

    async delete(id){
        await User.destroy({where:{id}})
    }
    

}

module.exports = new UserService()