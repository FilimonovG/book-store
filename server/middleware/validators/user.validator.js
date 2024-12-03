const { body } = require("express-validator");

module.exports = () => {
    return[
        body('email')
            .exists({ checkFalsy: true })
            .withMessage('Title is required')
            .isEmail()
            .withMessage('Email is required'),
        body('password')
            .exists({ checkFalsy: true })
            .withMessage('Price is required')
            .isLength({min:8, max:32})
            .withMessage('Passwords must be at least 8 characters'),
    ]
}
