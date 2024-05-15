import {Request, Response, Router} from 'express';
import prisma from '../prisma';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const rates = await prisma.rate.findMany();
    res.json(rates);
});

router.get('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    const rate = await prisma.rate.findUnique({
        where: {
            id: parseInt(id)
        }
    });
    res.json(rate);
});

router.get('/user/:userId', async (req: Request, res: Response) => {
    const {userId} = req.params;
    const rates = await prisma.rate.findMany({
        where: {
            userId: parseInt(userId)
        }
    });
    res.json(rates);
});

router.get('/serie/:serieId', async (req: Request, res: Response) => {
    const {serieId} = req.params;
    const rates = await prisma.rate.findMany({
        where: {
            serieId: parseInt(serieId)
        }
    });
    res.json(rates);
});

router.post('/', async (req: Request, res: Response) => {
    const {userId, serieId, rate} = req.body;
    if (!userId || !serieId || !rate) {
        return res.status(400).json({
            error: 'Missing required fields. Please ensure userId, serieId and rate are provided.'
        });
    }
    const rateObj = await prisma.rate.create({
        data: {
            userId: parseInt(userId),
            serieId: parseInt(serieId),
            rate: parseInt(rate)
        }
    });
    res.json(rateObj);
});

router.put('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    const {userId, serieId, rate} = req.body;
    if (!userId || !serieId || !rate) {
        return res.status(400).json({
            error: 'Missing required fields. Please ensure userId, serieId and rate are provided.'
        });
    }
    const rateObj = await prisma.rate.update({
        where: {
            id: parseInt(id)
        },
        data: {
            userId: parseInt(userId),
            serieId: parseInt(serieId),
            rate: parseInt(rate)
        }
    });
    res.json(rateObj);
});

router.delete('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    if (!id) {
        return res.status(400).json({
            error: 'Missing required fields. Please ensure id is provided.'
        });
    }
    await prisma.rate.delete({
        where: {
            id: parseInt(id)
        }
    });
    res.json({message: 'Rate deleted successfully'});
});


export default router;