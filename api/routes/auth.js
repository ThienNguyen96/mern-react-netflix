import express from 'express';
import {UserModel} from '../models/User.js';


const router = express.Router();

//register

router.post('/register', async(req, res) => {
    try {
        const newUser = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

export default router;