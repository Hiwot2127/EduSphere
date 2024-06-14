import express from 'express'
const router = express.Router()

import courseController from '../controllers/courseController.js'

router.get('/', courseController.getCourse)
router.get('/:id', courseController.getCourseById)
router.post('/', courseController.createCourse)
router.put('/:id', courseController.updateCourse)
router.delete('/:id', courseController.deleteCourse)

export default router