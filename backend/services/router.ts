import {PrismaClient} from "@prisma/client";
import express from 'express';

import userRouter from '../routes/user';
import postRouter from '../routes/post';
import commentRouter from '../routes/comment';
import favoriteRouter from '../routes/favorite';
import rateRouter from '../routes/rate';
import seenRouter from '../routes/seen';


export default function router() {
    const prisma = new PrismaClient();
    const app = express();
    app.use(express.json());

    app.use('/users', userRouter);
    app.use('/posts', postRouter);
    app.use('/comments', commentRouter);
    app.use('/favorites', favoriteRouter);
    app.use('/rates', rateRouter);
    app.use('/seens', seenRouter);
    return app;
}