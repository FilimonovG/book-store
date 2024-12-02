class ApiError extends Error{
    constructor(status, message, errors = []) {
        super(message);
        this.status = status
        this.errors = errors
    }

    static UnauthorizedError(message = "Не авторизован"){
        return new ApiError(401, message)
    }

    static ForbiddenError(){
        return new ApiError(403, "Нет доступа")
    }

    static BadRequest(message, errors = []){
        return new ApiError(400, message, errors)
    }

    static NotFoundError(message){
        return new ApiError(404, message)
    }

    static AlreadyExists(message, errors = []){
        return new ApiError(400, message, errors)
    }
}

module.exports = ApiError