import mongoose from 'mongoose';
import express from 'express';
import axios from 'axios';
import config from '../config/config.js';
import { BaseResponse } from '../helper/baseresponse.js';
import Course from '../models/courseModel.js';

const udemyAxios = axios.create({
    baseURL: config.UDEMY_BASE_URL,
    auth: {
        username: config.UDEMY_CLIENT_ID,
        password: config.UDEMY_CLIENT_SECRET,
    },
});

const getCourse = async (req, res, next) => {
    try {
        const category = req.query.category;
        const page = req.query.page || 1;
        const pageSize = req.query.page_size || 20;

        const courses = await udemyAxios.get('/courses', {
            params: {
                page,
                page_size: pageSize,
                category,
            },
        });

        if (!courses) {
            throw new Error('Courses not found');
        }

        const baseResponse = new BaseResponse({
            data: courses.data,
            success: true,
            message: 'Courses fetched successfully',
        });

        res.status(200).json(baseResponse);
    } catch (error) {
        next(error);
    }
};

const getCourseById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const course = await udemyAxios.get(`/courses/${id}`);
        let curriculum = [];
        let response = [];
        let page = 1;

        while (true) {
            try {
                const curriculumData = await udemyAxios.get(`/courses/${id}/public-curriculum-items/`, {
                    params: {
                        page,
                    },
                });
                response = response.concat(curriculumData.data.results);
                page++;
            } catch (e) {
                if (e.response && e.response.status === 404) break;
                throw e;
            }
        }

        const infos = response.reduce((acc, curr) => {
            if (curr?.asset?.asset_type === 'Video') acc.video++;
            if (curr?.asset?.asset_type === 'Article') acc.article++;
            if (curr?.is_downloadable) acc.downloadable++;
            return acc;
        }, { video: 0, article: 0, downloadable: 0 });

        response.push(infos);

        if (!course) {
            throw new Error('Course not found');
        }

        const baseResponse = new BaseResponse({
            data: {
                ...course.data,
                curriculum: response,
            },
            success: true,
            message: 'Course fetched successfully',
        });

        res.status(200).json(baseResponse);
    } catch (error) {
        next(error);
    }
};

const createCourse = async (req, res, next) => {
    try {
        const {
            category,
            sub_category,
            topic,
            date,
            qty,
            level,
            details,
            numReviews,
            price,
            rating,
            description,
            image,
            author,
            discount,
        } = req.body;

        const course = await Course.create({
            category,
            sub_category,
            topic,
            date,
            qty,
            level,
            details,
            numReviews,
            price,
            rating,
            description,
            image,
            author,
            discount,
        });

        const baseResponse = new BaseResponse({
            data: course,
            success: true,
            message: 'Course created successfully',
        });

        res.status(201).json(baseResponse);
    } catch (error) {
        next(error);
    }
};

const updateCourse = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid course id');
        }

        const updateData = req.body;
        const course = await Course.findByIdAndUpdate(id, updateData, { new: true });

        if (!course) {
            throw new Error('Course not found');
        }

        const baseResponse = new BaseResponse({
            data: course,
            success: true,
            message: 'Course updated successfully',
        });

        res.status(200).json(baseResponse);
    } catch (error) {
        next(error);
    }
};

const deleteCourse = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid course id');
        }

        const course = await Course.findByIdAndDelete(id);

        if (!course) {
            throw new Error('Course not found');
        }

        const baseResponse = new BaseResponse({
            success: true,
            message: 'Course deleted successfully',
        });

        res.status(200).json(baseResponse);
    } catch (error) {
        next(error);
    }
};

export default {
    getCourse,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
};
