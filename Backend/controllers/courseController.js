import asyncHandler from 'express-async-handler'
import Course from '../models/courseModel.js'


// @desc    Fetch all Course
// @route   GET /api/courses   
// @access  public
const getCourses = asyncHandler(async(req, res) => {
    const courses = await Course.find()
    
    res.json(courses)
})


// @desc    Fetch Course by ID
// @route   GET /api/courses/:id   
// @access  public
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