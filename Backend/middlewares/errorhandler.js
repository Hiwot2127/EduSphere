import {BaseResponse} from '../helper/baseresponse.js';
import express from 'express';
// handle error
export default function errorHandler(err, req, res, next) {

	if (res.headersSent) {
		return next()
	}
	let baseResponse = new BaseResponse();
    baseResponse.message = err.message
    baseResponse.errors.push(err.message)
	res.status(500).json({...baseResponse})
	return
}