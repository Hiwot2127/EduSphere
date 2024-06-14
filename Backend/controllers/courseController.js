import mongoose from 'mongoose';
import { BaseResponse } from '../helper/baseresponse.js';
import Course from '../models/courseModel.js';
import express, { json } from 'express';
import axios from 'axios';
import config from '../config/config.js';

const udemyAxios = axios.create({
    baseURL: config.UDEMY_BASE_URL,
    auth: {
      username: config.UDEMY_CLIENT_ID,
      password: config.UDEMY_CLIENT_SECRET,
    },
  });
const getCourse = async (req, res,next) => {
    try {
        const perpage = 20;
        const category = req.query.category;
        // console.log("category", category)
        const page = req.query.page || 1;
        const courses =  await udemyAxios.get('/courses', {
            params: {
              page: req.query.page || 1,
              page_size: req.query.page_size || 20,
              category
            },
          });
        // console.log(courses.data.results)
        if (!courses) {
            const error = new Error('Courses not found');
            error.statusCode = 500;
            throw error;
        }
        let baseResponse = new BaseResponse();
        baseResponse.data = courses.data;
        baseResponse.success = true;
        baseResponse.message = 'Courses fetched successfully';
        res.status(200).json({...baseResponse});
    } catch (error) {
        next(error);
    }
}
const getCourseById = async (req, res,next) => {
    try {
        const id = req.params.id;
        const course = await udemyAxios.get(`/courses/${id}`);
        let curriculum;
        let response = [];
        let i = 1;
        while (true){
            console.log(i)
            try{
              curriculum  = await udemyAxios.get(`/courses/${id}/public-curriculum-items/`,{
                    params: {
                        page: i,
                    }
                });
                i = i + 1;
                response = response.concat(curriculum.data.results)
            }catch(e){
                // console.log("error is happening now",e)
                if (e.response.status === 404){
                    break;
                }
                else{
                    throw e;
                }
            }


        }
        const  Infos = {video:0,article:0,downlodable:0}
        const result = [];
        // console.log(response)
        response.map((curr)=>{
            if (curr?.asset?.asset_type === 'Video'){
                Infos.video += 1
            }
            else if (curr?.asset?.asset_type === 'Article'){
                Infos.article += 1
            }
            if (curr?.is_downloadable){
                Infos.downlodable += 1
            }

    }
    )
        response.push(Infos)
        if (!course) {
            const error = new Error('Course not found');
            error.statusCode = 404;
            throw error;
        }
        let baseResponse = new BaseResponse();
        baseResponse.data = {
            ...course.data,
            curriculum: response,
        }
        baseResponse.success = true;
        baseResponse.message = 'Course fetched successfully';
        res.status(200).json({...baseResponse});
    } catch (error) {
        console.log(error)
        next(error);
    }
}
const createCourse = async (req, res,next) => {
    try {
        const {catagory,sub_catagory,topic,date,qty,level,details,numReviews,price,rating,description,image,author,discount} = req.body;
        const course = await Course.create({catagory,sub_catagory,topic,date,qty,level,details,numReviews,price,rating,description,image,author,discount}
        );
        let baseResponse = new BaseResponse();
        baseResponse.data = {
            ...course
        }
        baseResponse.success = true;
        baseResponse.message = 'Course created successfully';
        res.status(201).json({...baseResponse});
    } catch (error) {
        next(error);
    }
}
const updateCourse = async (req, res,next) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error('Invalid course id');
            error.statusCode = 500;
            throw error;
        }
        const {catagory,sub_catagory,topic,date,qty,level,details,numReviews,price,rating,description,image,author,discount} = req.body;
        const course = await Course.findByIdAndUpdate(id,{catagory,sub_catagory,topic,date,qty,level,details,numReviews,price,rating,description,image,author,discount}
        ,{new:true});
        if (!course) {
            const error = new Error('Course not found');
            error.statusCode = 404;
            throw error;
        }
        let baseResponse = new BaseResponse();
        baseResponse.data = {
            ...course
        }
        baseResponse.success = true;
        baseResponse.message = 'Course updated successfully';
        res.status(200).json({...baseResponse});
    } catch (error) {
        next(error);
    }
}
const deleteCourse = async (req, res,next) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error('Invalid course id');
            error.statusCode = 500;
            throw error;
        }
        const course = await Course.findByIdAndDelete(id);
        if (!course) {
            const error = new Error('Course not found');
            error.statusCode = 404;
            throw error;
        }
        let baseResponse = new BaseResponse();
        baseResponse.success = true;
        baseResponse.message = 'Course deleted successfully';
        res.status(200).json({...baseResponse});
    } catch (error) {
        next(error);
    }
}

export default {getCourse,getCourseById,createCourse,updateCourse,deleteCourse};