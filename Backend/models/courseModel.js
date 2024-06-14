import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
    },

    { timestamps: true }
)

const courseSchema = mongoose.Schema(
    {
        author: {
            type: String,
            required: true,
        },
        
        title: {
            type: String,
            required: true,
        },
        discount: {
            type: Number,
            default: 0
        },
        category: {
            type: String,
            required: true
        },
        sub_category: {
            type: String,
            required: true
        },
        topic: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        qty: {
            type: Number,
            required: true
        },
        level: {
            type: String,
            required: true
        },
        details: {
            type: Array,
            required: true
        },       
        image: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        rating: {
            type: Number,
            default: 0
        },

        numReviews: {
            type: Number,
            default: 0
        },

        price: {
            type: Number,
            default: 0
        },
    },

    {
        timestamps: true
    }
)
const Course = mongoose.model('Course', courseSchema)

export default Course