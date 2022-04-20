import express from 'express';
import {ListModel} from '../models/List.js';
import verify from '../verifyToken.js';


const router = express.Router();

//create

router.post('/',verify ,async(req, res) => {
    if (req.user.isAdmin) {
        const newList = ListModel(req.body);
        try {
            const savedList = await newList.save();
            res.status(200).json(savedList);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json('You are not allowed!');
    }
});


export default router;