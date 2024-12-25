const {Category, Book, Author, Review} = require('../models/models')
const ApiError = require("../exceptions/Api.error");

class CategoryService {

    async findAll(){
        return await Category.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
        })
    }

    async findAllWithBooks(){
        return await Category.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
            include:{
                model: Book,
                attributes:[
                    'id',
                    'title',
                    'price',
                    'description',
                    'discount',
                    'imageUrl',
                    'rating',
                    'number_of_ratings'
                ],
                include:[
                    {
                        model: Author,
                        through: {
                            attributes: []
                        },
                        attributes:[
                            'id',
                            'name'
                        ]
                    },
                    {
                        model: Review
                    }
                ]
            }
        })
    }

    async findById(id){
        const category = await Category.findOne({
            where: {id},
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
            include:{
                model: Book,
                attributes:[
                    'id',
                    'title',
                    'price',
                    'description',
                    'discount',
                    'imageUrl',
                    'rating',
                    'number_of_ratings'
                ],
                include:{
                    model: Author,
                    through: {
                        attributes: []
                    },
                    attributes:[
                        'id',
                        'name'
                    ]
                }
            }
        })
        if (!category){
            throw ApiError.NotFoundError(`Category with id='${id}' not found`);
        }
        return category
    }

    async create({title, description}) {
        const category = await Category.findOne({where:{title}})
        if (category){
            throw ApiError.AlreadyExists(`Category with title='${title}' already exists`)
        }
        return await Category.create({
            title: title,
            description: description,
        })
    }

    async update(id, title){
        const category = await Category.findOne({where:{id}})
        if (!category){
            throw ApiError.NotFoundError(`Category with id='${id}' not found`);
        }
        category.title = title
        return await category.save()
    }

    async delete(id){
        await Category.destroy({where: {id}})
    }
}

module.exports = new CategoryService()