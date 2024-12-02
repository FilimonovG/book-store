const jwt = require('jsonwebtoken')
const {Token} = require('../models/models')

class TokenService{

    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return{
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken){
        const tokenData = await Token.findOne({where: {userId}})
        if (tokenData){
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        return await Token.create({userId, refreshToken})
    }

    async removeToken(refreshToken){
        return await Token.destroy({where: {refreshToken}})
    }

    validateToken(token, secret){
        try {
            return jwt.verify(token, secret)
        }catch (e){
            return null
        }
    }

    async findToken(refreshToken){
        return await Token.findOne({where:{refreshToken}})
    }

}

module.exports = new TokenService()