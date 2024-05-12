import mongoose from 'mongoose'
import dotenv from 'dotenv'
import mongoDB from './db/mongoDB.js'

import User from './models/userModel.js'
import Course from './models/courseModel.js'
import users from './data/users.js'
import courses from './data/courses.js'

dotenv.config()
mongoDB()

const saveData = async () => {
    try {
        const createdUsers = await User.insertMany(users)

        const instructor = createdUsers[0]._id

        const dataCourses = courses.map((course) => {
            return { ...course, instructor: instructor }
        })

        await Course.insertMany(dataCourses)

        console.log('Data Created Success');
    } catch (error) {
        console.log('Error: ', error);
    }
}

const removeData = async () => {
    try {
        await User.deleteMany()
        await Course.deleteMany()

        console.log('Data Deleted Success');
    } catch (error) {
        console.log('Error: ', error);
    }
}

if(process.argv[2] === '-d') {
    removeData()
} else {
    saveData()
}