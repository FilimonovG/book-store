const cls = require('cls-hooked')
const namespace = cls.createNamespace('my-namespace')

const {Sequelize} = require('sequelize')
Sequelize.useCLS(namespace)

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)