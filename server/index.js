require('dotenv').config()
const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/error.middleware')
const fileUpload = require('express-fileupload')
const path = require('path')
const sequelize = require('./config/db')
const router = require('./routes/index')

const PORT = process.env.PORT || 5000
const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorMiddleware)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
