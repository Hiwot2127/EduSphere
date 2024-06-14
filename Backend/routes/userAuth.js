import express from 'express';
import userController from '../controllers/userController.js'; 
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.post('/signup', userController.userAuthWithToken);
router.post('/login', userController.loginUserController);

export default router;