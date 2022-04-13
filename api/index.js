import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';

import authRoute from './routes/auth.js';
import userRoute from './routes/users.js';
import movieRoute from './routes/movies.js';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected')
}).catch((err) => {
    console.log('Error', err)
});
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/movies', movieRoute);

app.listen("8080", () => {
    console.log('BE is running...');
});