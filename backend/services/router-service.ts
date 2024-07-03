import {PrismaClient} from "@prisma/client";
import express from 'express';
import cors from 'cors';

import userRouter from '../routes/user';
import postRouter from '../routes/post';
import commentRouter from '../routes/comment';
import favoriteRouter from '../routes/favorite';
import rateRouter from '../routes/rate';
import seenRouter from '../routes/seen';
import authRouter from '../routes/auth';
import tmdbRouter from "./tmdb-api-service";

import authMiddleware from '../middleware/jwt-middleware';

export default function routerService() {
    const prisma = new PrismaClient();
    const app = express();
    app.use(express.json());

    app.use(cors());

    app.use((req, res, next) => {
        console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
        next();
    });

    app.use('/users', authMiddleware, userRouter);
    app.use('/posts', authMiddleware, postRouter);
    app.use('/comments', authMiddleware, commentRouter);
    app.use('/favorites', authMiddleware, favoriteRouter);
    app.use('/rates', authMiddleware, rateRouter);
    app.use('/seen', authMiddleware, seenRouter);
    app.use('/auth', authRouter);
    app.use('/tmdb', authMiddleware, tmdbRouter);
    return app;
}