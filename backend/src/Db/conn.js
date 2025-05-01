import mongoose from 'mongoose'

const conn = async (req, res) => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        if (connect) {
            console.log("Db connected")
        }
    } catch (error) {
        console.error("Error while connecting the db", error)
        process.exit(1)
    }
}

export {conn}