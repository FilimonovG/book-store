const { body } = require("express-validator");

module.exports = () => {
    return[
        body('title')
            .exists({ checkFalsy: true })
            .withMessage('Title is required'),
        body('price')
            .exists({ checkFalsy: true })
            .withMessage('Price is required'),
        body('imageUrl')
            .exists({ checkFalsy: true })
            .withMessage('Image is required'),
        body('categoryId')
            .exists({ checkFalsy: true })
            .withMessage('Category is required'),
        body('authors')
            .exists({ checkFalsy: true })
            .withMessage('Author is required'),
    ]
}
