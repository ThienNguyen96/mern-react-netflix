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

//delete

router.delete('/:id',verify ,async(req, res) => {
    if (req.user.isAdmin) {
        try {
            await ListModel.findByIdAndDelete(req.params.id);
            res.status(200).json('The list has been deleted!');
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json('You are not allowed!');
    }
});

//get
router.get('/', verify, async(req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];

    try {
        if(typeQuery) {
            if(genreQuery) {
                list = await ListModel.aggregate([
                    {$sample: {size: 10}},
                    {$match: {type: typeQuery, genre: genreQuery}}
                ]);
            } else {
                list = await ListModel.aggregate([
                    {$sample: {size: 10}},
                    {$match: {type: typeQuery}}
                ]);
            }
        } else {
            list = await ListModel.aggregate([
                {$sample: {size: 10}}
            ]);
        }
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json(error);
    }
});



export default router;