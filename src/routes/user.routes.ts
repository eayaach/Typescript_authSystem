import express, { Router } from 'express';
import { validateResource } from '../middleware/validateResource';
import { createUserSchema } from '../schemas/user.schema';
import { createUserHandler } from '../controller/user.controller';
import { create } from 'lodash';

const router: Router = express.Router();


// create user route
router.post('/create', validateResource(createUserSchema), createUserHandler);

// verify user email route
router.get('/verify-email', (req, res) => {
    res.send('User email verification endpoint');
});

// forgot password route
router.post('/forgot-password', (req, res) => {
    res.send('Forgot password endpoint');
});

// reset password route
router.post('/reset-password', (req, res) => {
    res.send('Reset password endpoint');
});

// get current user route
router.get('/me', (req, res) => {
    res.send('Get current user endpoint');
});

// user login route
router.post('/login', (req, res) => {
    res.send('User login endpoint');
});

export default router;