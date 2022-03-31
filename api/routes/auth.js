import express from 'express';
import cryptoJs from 'crypto-js';
import {UserModel} from '../models/User.js';


const router = express.Router();


//register

router.post('/register', async(req, res) => {
    try {
        const newUser = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: cryptoJs.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
        });
        const user = await newUser.save();
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.post('/login/', async(req, res) => {
    try {
        const user = await UserModel.findOne({username: req.body.username});
        !user && res.status(401).json('Wrong password or username.');

        const bytes = await cryptoJs.AES.decrypt(user.password, process.env.SECRET_KEY);
        const validatePassword = bytes.toString(cryptoJs.enc.Utf8) === req.body.password;
        
        if (validatePassword) {
            const {password, ...others} = user._doc;
            res.status(200).json(others);
        } else {
            res.status(401).json('Wrong password or username.');
        }

    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;