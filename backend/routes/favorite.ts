import {Request, Response, Router} from 'express';
import prisma from '../prisma';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const favorites = await prisma.favorite.findMany();
    res.json(favorites);
});

router.get('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    const favorite = await prisma.favorite.findUnique({
        where: {
            id: parseInt(id)
        }
    });
    res.json(favorite);
});

router.get('/user/:userId', async (req: Request, res: Response) => {
    const {userId} = req.params;
    const favorites = await prisma.favorite.findMany({
        where: {
            userId: parseInt(userId)
        }
    });
    res.json(favorites);
});

router.post('/', async (req: Request, res: Response) => {
    const {userId, serieId, serieType} = req.body;
    if (!userId || !serieId || !serieType) {
        return res.status(400).json({
            error: 'Missing required fields. Please ensure userId and postId are provided.'
        });
    }
    const favorite = await prisma.favorite.create({
        data: {
            userId: parseInt(userId),
            serieId: parseInt(serieId),
            serieType
        }
    });
    res.json(favorite);
});

router.delete('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    await prisma.favorite.delete({
        where: {
            id: parseInt(id)
        }
    });
    res.json({message: 'Favorite deleted successfully.'});
});

router.get('/user/:userId/:serieType/:serieId', async (req: Request, res: Response) => {
    const {userId, serieType, serieId} = req.params;
    const favorite = await prisma.favorite.findFirst({
        where: {
            userId: parseInt(userId),
            serieType,
            serieId: parseInt(serieId)
        }
    });
    res.json(favorite);
});

router.delete('/user/:userId/:serieType/:serieId', async (req: Request, res: Response) => {
    const {userId, serieType, serieId} = req.params;
    await prisma.favorite.deleteMany({
        where: {
            userId: parseInt(userId),
            serieType,
            serieId: parseInt(serieId)
        }
    });
    res.json({message: 'Favorite deleted successfully.'});
});

export default router;