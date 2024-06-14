import { BaseResponse } from '../helper/baseresponse.js';
import express from 'express';

// Error handler middleware
export default function errorHandler(err, req, res, next) {
    // Check if headers have already been sent
    if (res.headersSent) {
        // If headers are already sent, pass the error to the next error handler
        return next(err);
    }

    // Create a new BaseResponse instance
    let baseResponse = new BaseResponse();

    
    baseResponse.message = err.message;

    
    baseResponse.errors.push(err.message);

    // Send a JSON response with status 500 (Internal Server Error) and the base response
    res.status(500).json({ ...baseResponse });

    return;
}
