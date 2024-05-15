import {Request, Response, Router} from 'express';
import prisma from '../prisma';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const posts = await prisma.post.findMany();
    res.json(posts);
});

router.get('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    const post = await prisma.post.findUnique({
        where: {
            id: parseInt(id)
        }
    });
    res.json(post);
});

router.get('/author/:authorId', async (req: Request, res: Response) => {
    const {authorId} = req.params;
    const posts = await prisma.post.findMany({
        where: {
            authorId: parseInt(authorId)
        }
    });
    res.json(posts);
});

router.post('/', async (req: Request, res: Response) => {
    const {title, content, authorId} = req.body;
    if (!title || !content || !authorId) {
        return res.status(400).json({
            error: 'Missing required fields. Please ensure title, content, and authorId are provided.'
        });
    }
    const post = await prisma.post.create({
        data: {
            title,
            content,
            authorId: parseInt(authorId)
        }
    });
    res.json(post);
});

router.put('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    const {title, content, authorId} = req.body;
    if (!title || !content || !authorId) {
        return res.status(400).json({
            error: 'Missing required fields. Please ensure title, content, and authorId are provided.'
        });
    }
    const post = await prisma.post.update({
        where: {
            id: parseInt(id)
        },
        data: {
            title,
            content,
            authorId: parseInt(authorId)
        }
    });
    res.json(post);
});

router.delete('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    await prisma.post.delete({
        where: {
            id: parseInt(id)
        }
    });
    res.json({
        message: 'Post deleted successfully.'
    });
});

export default router;