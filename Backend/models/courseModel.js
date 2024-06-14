import mongoose from 'mongoose';

// Define the schema for reviews
const reviewSchema = mongoose.Schema(
    {
        name: { type: String, required: true },  // Reviewer's name, required field
        rating: { type: Number, required: true },  // Rating given by the reviewer, required field
        comment: { type: String, required: true },  // Review comment, required field
    },
    {
        timestamps: true  // Automatically add createdAt and updatedAt fields to the schema
    }
);

// Define the schema for courses
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
            required: true  // Image URL for the course, required field
        },
        description: {
            type: String,
            required: true  // Description of the course, required field
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
        timestamps: true  // Automatically add createdAt and updatedAt fields to the schema
    }
);

// Create and export the Course model based on the schema
const Course = mongoose.model('Course', courseSchema);

export default Course;
