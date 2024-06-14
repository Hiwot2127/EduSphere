import express from 'express';
import { stripePayment } from '../controllers/stripe.js';
import auth from '../middlewares/authenticate.js';
const router = express.Router();
router.post('/create-payment-intent',auth.isAuthenticated,stripePayment)
export default router