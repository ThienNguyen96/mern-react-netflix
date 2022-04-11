import express from 'express';
import {MovieModel} from '../models/Movie.js';
import verify from '../verifyToken.js';


const router = express.Router();

//create

router.post('/',verify ,async(req, res) => {
    if (req.user.isAdmin) {
        const newMovie = MovieModel(req.body);
        try {
            const savedMovie = await newMovie.save();
            res.status(200).json(savedMovie);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json('You are not allowed!');
    }
});

//update

router.put('/:id', verify ,async(req, res) => {
    if (req.user.isAdmin) {
        const updateMovie = await MovieModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
        try {
            res.status(200).json(updateMovie);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json('You are not allowed!');
    }
});

//delete 
router.delete('/:id', verify ,async(req, res) => {
    if (req.user.isAdmin) {
        await MovieModel.findByIdAndDelete(req.params.id);
        try {
            res.status(200).json('The movie has been deleted.');
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json('You are not allowed!');
    }
});

//get

router.get('/:id', verify ,async(req, res) => {
    try {
        const movie = await MovieModel.findById(req.params.id);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json(error);
    }
});

// get all

router.get('/', verify ,async(req, res) => {
    try {
        const movies = await MovieModel.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json(error);
    }
});

// get random 

// router.get('/random', verify ,async(req, res) => {
//     try {
//         const movie = await MovieModel.findById(req.params.id);
//         res.status(200).json(movie);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });








export default router;