const { body, files } = require("express-validator");

module.exports = () => {
    return[
        body('title')
            .exists({ checkFalsy: true })
            .withMessage('Title is required'),
        body('price')
            .exists({ checkFalsy: true })
            .withMessage('Price is required'),
        body('categoryId')
            .exists({ checkFalsy: true })
            .withMessage('Category id is required'),
        body('authors')
            .exists({ checkFalsy: true })
            .withMessage('Author is required'),
    ]
}
