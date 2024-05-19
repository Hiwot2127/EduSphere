import asyncHandler from 'express-async-handler'
import Course from '../models/courseModel.js'

const getCourses = asyncHandler(async(req, res) => {
    const courses = await Course.find()
    
    res.json(courses)
})

const getCourseById = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id)

    if(course) {
        res.json(course)
    } else {
        res.status(400).json({ message: "Course Not Found"})
    }
})


export {
    getCourses,
    getCourseById
}