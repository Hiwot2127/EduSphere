import express from 'express'
import dotenv from 'dotenv'
import mongoDB from './db/mongoDB.js'

import courseRoutes from './routes/courseRoutes.js'

dotenv.config()

mongoDB()

const app = express()

app.get('/', (req, res) => {
    res.send('Api is Running')
})

app.use('/api/courses', courseRoutes)

const PORT = process.env.PORT || 3000

app.listen(
    PORT, 
    console.log(`Server running on PORT: ${PORT}`)
)