const ApiError = require('../exceptions/Api.error')
const tokenService = require('../services/token.service')

module.exports = function (role) {
    return function (req, res, next) {
        try {
            const authorizationHeader = req.headers.authorization;
            const accessToken = authorizationHeader.split(' ')[1];

            if (!accessToken) {
                return next(ApiError.UnauthorizedError())
            }

            const userData = tokenService.validateToken(accessToken, process.env.JWT_ACCESS_SECRET);

            if (!userData) {
                return next(ApiError.UnauthorizedError());
            }

            if (userData.role !== role && userData.role !== 'ADMIN'){
                return next(ApiError.ForbiddenError())
            }

            req.user = userData;
            next();
        } catch (e) {
            return next(ApiError.UnauthorizedError());
        }
    }
}
