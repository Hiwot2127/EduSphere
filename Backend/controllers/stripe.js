import express from 'express';
import config from "../config/config.js";
import Stripe from 'stripe';

import { BaseResponse } from '../helper/baseresponse.js';

const stripe = new Stripe(config.STRIPE_SECRET_KEY);

export const stripePayment = async (req, res,next) => {
    const { amount } = req.body;
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
      });
      let baseresponse = new BaseResponse();
        baseresponse.data = {
        paymentIntent: paymentIntent.client_secret
      }
        baseresponse.success = true;
        baseresponse.message = "Payment intent created successfully";
        res.status(200).json({...baseresponse});
    } catch (error) {
        next(error);
    }
  }