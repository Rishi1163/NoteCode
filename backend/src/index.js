import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { conn } from './Db/conn.js'
import snippetRouter from './routes/snippet.routes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL || process.env.DEPLOY_URL,
    credentials: true,
}))

app.use('/api/snippet',snippetRouter)

conn().then(() => {
    app.listen(port, () => {
        console.log("Listening to port", port)
    })
})