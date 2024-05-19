import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/Header2'
import Hero from '../components/Hero'
import Course from '../components/Course'
import Banner from '../components/Banner'
import Partner from '../components/Partner'
import Footer from '../components/Footer/Footer'

const Home = () => {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        const fetchCourses = async () => {
            const { data } = await axios.get('/api/courses')

            setCourses(data)
        }

        fetchCourses()
    }, [])

    return (
        <>
            <div className="container-fluid">
                <Header />
                <Hero />
                <Banner />

                <div className="courses-list">
                    {courses.map(course => (
                        <Course key={course._id} course={course} />
                    ))}
                </div>
            </div>

            <Partner />
            <Footer />
        </>

    )
}

export default Home