import {Request, Response, Router} from 'express';
import prisma from '../prisma';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

router.get('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id)
        }
    });
    res.json(user);
});

router.post('/', async (req: Request, res: Response) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            error: 'Missing required fields. Please ensure name, email, and password are provided.'
        });
    }
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    });
    res.json(user);
});

router.put('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            error: 'Missing required fields. Please ensure name, email, and password are provided.'
        });
    }
    const user = await prisma.user.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name,
            email,
            password
        }
    });
    res.json(user);
});

router.delete('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    const user = await prisma.user.delete({
        where: {
            id: parseInt(id)
        }
    });
    res.json(user);
});

export default router;

