require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

//ConnectDB
const connectDB = require('./db/connect')

//RouterFunctions
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

//ErrorHandlerFunctions
const notFound = require('./middlewares/notFound')
const errorHandlerMiddleware = require('./middlewares/errorHandler')


//Express Middlewares
app.use(express.json())


//Routes
app.use('/api/v1/jobs', jobsRouter)
app.use('/api/v1/auth', authRouter)

//Error Handler || 404 Handler
app.use(notFound)
app.use(errorHandlerMiddleware)

// INITIALIZE PORT
const port = process.env.PORT || 3000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Listening to port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()