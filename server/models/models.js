const sequelize = require('../config/db')
const {DataTypes} = require('sequelize')

const Author = sequelize.define('authors', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    imageUrl:{type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
})

const Book = sequelize.define('books', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    imageUrl:{type: DataTypes.STRING, allowNull: false},
    rating: {type: DataTypes.FLOAT, defaultValue: 0},
    number_of_ratings: {type: DataTypes.INTEGER, defaultValue: 0},
    description: {type: DataTypes.TEXT},
    discount: {type: DataTypes.INTEGER},
    weight: {type: DataTypes.INTEGER},
    coverType: {type: DataTypes.STRING},
    pagesAmount: {type: DataTypes.INTEGER},
})

const Token = sequelize.define('tokens', {
    refreshToken: {type: DataTypes.TEXT, allowNull: false},
})

const User = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    username:{type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING},
})

const Category = sequelize.define('categories',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false, unique: true},
    description: {type: DataTypes.STRING, allowNull: true},
})

const Review = sequelize.define('reviews',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rating: {type: DataTypes.INTEGER, allowNull: false, min:1, max:5},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
})

const Order = sequelize.define('orders',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    total_price: {type: DataTypes.INTEGER},
})

const Book_Author = sequelize.define('books_authors', {}, { timestamps: false });

Book.belongsToMany(Author, { through: Book_Author })
Author.belongsToMany(Book, { through: Book_Author })

const Order_Book = sequelize.define('orders_books', {
    quantity: {type: DataTypes.INTEGER, allowNull: false},
}, { timestamps: false });

Order.belongsToMany(Book, {through: Order_Book})
Book.belongsToMany(Order, {through: Order_Book})

User.hasOne(Token)
Token.belongsTo(User);

Category.hasMany(Book)
Book.belongsTo(Category)

Book.hasMany(Review)
Review.belongsTo(Book)

User.hasMany(Review)
Review.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

module.exports = {
    Book,
    Author,
    User,
    Token,
    Order,
    Review,
    Category,
    Book_Author,
    Order_Book
}