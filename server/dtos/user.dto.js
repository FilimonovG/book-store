module.exports = class UserDto{
    id
    email
    username
    role
    isActivated
    constructor(model) {
        this.id = model.id
        this.email = model.email
        this.username = model.username
        this.role = model.role
        this.isActivated = model.isActivated
    }
}