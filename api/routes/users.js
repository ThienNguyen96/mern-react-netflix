import express from 'express';
import cryptoJs from 'crypto-js';
import {UserModel} from '../models/User.js';
import verify from '../verifyToken.js';


const router = express.Router();

//update
router.put('/:id', verify, async(req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = cryptoJs.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
        }
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {new: true});
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json('You can update only your account!');
    }
});

//delete

router.delete('/:id', verify, async(req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await UserModel.findByIdAndDelete(req.params.id);
            res.status(200).json('User has been deleted.');
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json('You can delete only your account!');
    }
});

//get

router.get('/find/:id', async(req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        const {password, ...info} = user._doc;
        res.status(200).json(info);
    } catch (error) {
        res.status(500).json(error);
    }
});

//get all

router.get('/', verify, async(req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
        try {
            const users = query ? await UserModel.find().limit(10) : await UserModel.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json('You are not allowed to see all users!');
    }
});

//get user stats

export default router;