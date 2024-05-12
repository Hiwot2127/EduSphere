import mongoose from 'mongoose'

const connectDB = async (req, res) => {
    try {
        const connection = await mongoose.connect(process.env.CONNECTION_DB, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })

        console.log(`MongoDB Connected: ${connection.connection.host}`);
    } catch (error) {
        console.log('Error: ', error);
    }
}

export default connectDB