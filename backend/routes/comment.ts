import {Request, Response, Router} from 'express';
import prisma from '../prisma';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const comments = await prisma.comment.findMany();
    res.json(comments);
});

router.get('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    const comment = await prisma.comment.findUnique({
        where: {
            id: parseInt(id)
        }
    });
    res.json(comment);
});

router.post('/', async (req: Request, res: Response) => {
    const {content, authorId, postId} = req.body;
    if (!content || !authorId || !postId) {
        return res.status(400).json({
            error: 'Missing required fields. Please ensure content, authorId, and postId are provided.'
        });
    }
    const comment = await prisma.comment.create({
        data: {
            content,
            authorId: parseInt(authorId),
            postId: parseInt(postId)
        }
    });
    res.json(comment);
});

router.put('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    const {content, authorId, postId} = req.body;
    if (!content || !authorId || !postId) {
        return res.status(400).json({
            error: 'Missing required fields. Please ensure content, authorId, and postId are provided.'
        });
    }
    const comment = await prisma.comment.update({
        where: {
            id: parseInt(id)
        },
        data: {
            content,
            authorId: parseInt(authorId),
            postId: parseInt(postId)
        }
    });
    res.json(comment);
});

router.delete('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    await prisma.comment.delete({
        where: {
            id: parseInt(id)
        }
    });
    res.json({message: 'Comment deleted.'});
});

export default router;