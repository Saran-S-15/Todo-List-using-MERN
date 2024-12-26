import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import connectDB from './database/connectDB.js';
import TodoRoutes from './routes/Todo.routes.js';


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/todo", TodoRoutes);

app.listen(process.env.PORT || 5000, () => {
    connectDB();
    console.log(`Server is Running on port ${process.env.PORT}`);
})