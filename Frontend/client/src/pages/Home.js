import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/Header2'
import Hero from '../components/Hero'
import Course from '../components/Course'
import Banner from '../components/Banner'
import Partner from '../components/partner/Partner'
import Footer from '../components/Footer/Footer'
import { useDispatch,useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'; // Toast notifications
import 'react-toastify/dist/ReactToastify.css'; // CSS for toast notifications
import { notify } from "../Redux/login/action"; // Redux actions
import { SuggestionCard } from '../components/ProdCard/ProdCard';
import { useRef } from 'react'
import './Home.css'
const Home = () => {
    const dispatch = useDispatch();
    const loading = useRef(true);
    const [products, setProducts] = useState([]);
    let { message } = useSelector((store) => store.auth);

    useEffect(() => {
        if (message !== "") {
          dispatch(notify(""));
          toast.warn(message);
          message = "";
        }
      }, []);

    // const [courses, setCourses] = useState([])

    // useEffect(() => {
    //     const fetchCourses = async () => {
    //         const { data } = await axios.get('/api/courses')

    //         setCourses(data)
    //     }

    //     fetchCourses()
    // }, [])

    return (
        <>
                <ToastContainer />

            <div className="container-fluid">
        <div className="upper-banner">
            <div className="banner-content">
                <h1>Learn on your schedule</h1>
                <p>
                    Study any topic, anytime. Explore thousands of courses starting at $12.99 each.
                </p>
                <form className="search-form">
                    <input type="text" placeholder="What do you want to learn?" />
                    <button type="submit">Search</button>
                </form>
            </div>
        </div>

                <Hero />
                <Banner />
                <section className="landing-container">
                <section className="landing-container">
            <SuggestionCard
              title={"Popular for advancing Health & Fitness"}
              data={products}
              category={"Health & Fitness"}
            />
            <SuggestionCard
              title={"Popular in Marketing"}
              data={products}
              category={"Marketing"}
            />
          </section>
          </section>

                {/* <div className="courses-list">
                    {courses.map(course => (
                        <Course key={course._id} course={course} />
                    ))}
                </div> */}
            </div>

            <Partner />
        </>

    )
}

export default Home