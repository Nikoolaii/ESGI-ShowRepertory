import {Request, Response, Router} from 'express';
import prisma from '../prisma';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const seens = await prisma.seen.findMany();
    res.json(seens);
});

router.get('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    const seen = await prisma.seen.findUnique({
        where: {
            id: parseInt(id)
        }
    });
    res.json(seen);
});

router.get('/user/:userId', async (req: Request, res: Response) => {
    const {userId} = req.params;
    const seens = await prisma.seen.findMany({
        where: {
            userId: parseInt(userId)
        }
    });
    res.json(seens);
});

router.post('/', async (req: Request, res: Response) => {
    const {userId, serieId, saisonId, episodeId, serieType} = req.body;
    if (!userId || !serieId || !saisonId || !episodeId || !serieType) {
        return res.status(400).json({
            error: 'Missing required fields. Please ensure userId and postId are provided.'
        });
    }
    const seen = await prisma.seen.create({
        data: {
            userId: parseInt(userId),
            serieId: parseInt(serieId),
            saisonId: parseInt(saisonId),
            episodeId: parseInt(episodeId),
            serieType
        }
    });
    res.json(seen);
});

router.delete('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    if (!id) {
        return res.status(400).json({
            error: 'Missing required fields. Please ensure userId and postId are provided.'
        });
    }
    await prisma.seen.delete({
        where: {
            id: parseInt(id)
        }
    });
    res.json({message: 'Seen deleted successfully.'});
});

export default router;