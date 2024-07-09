import {Request, Response, Router} from 'express';
import prisma from '../prisma';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const seens = await prisma.seen.findMany();
        res.json(seens);
    } catch (error) {
        res.status(500).json({error: 'Erreur lors de la récupération des enregistrements.'});
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const seen = await prisma.seen.findUnique({
            where: {id: parseInt(id)}
        });
        if (seen) {
            res.json(seen);
        } else {
            res.status(404).json({error: 'Enregistrement non trouvé.'});
        }
    } catch (error) {
        res.status(500).json({error: 'Erreur lors de la récupération de l\'enregistrement.'});
    }
});

router.get('/user/:userId', async (req: Request, res: Response) => {
    const {userId} = req.params;
    try {
        const seens = await prisma.seen.findMany({
            where: {userId: parseInt(userId)}
        });
        res.json(seens);
    } catch (error) {
        res.status(500).json({error: 'Erreur lors de la récupération des enregistrements.'});
    }
});

router.post('/', async (req: Request, res: Response) => {
    const {userId, episodeId, serieType} = req.body;
    if (!userId || !episodeId || !serieType) {
        return res.status(400).json({error: 'Champs requis manquants.'});
    }
    try {
        const seen = await prisma.seen.create({
            data: {
                userId: parseInt(userId),
                episodeId: parseInt(episodeId),
                serieType
            }
        });
        res.json(seen);
    } catch (error) {
        res.status(500).json({error: 'Erreur lors de la création de l\'enregistrement.'});
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    if (!id) {
        return res.status(400).json({error: 'Champs requis manquants.'});
    }
    try {
        await prisma.seen.delete({
            where: {id: parseInt(id)}
        });
        res.json({message: 'Enregistrement supprimé avec succès.'});
    } catch (error) {
        res.status(500).json({error: 'Erreur lors de la suppression de l\'enregistrement.'});
    }
});

router.get('/:serieType/:userId/:episodeId', async (req: Request, res: Response) => {
    const {serieType, episodeId, userId} = req.params;
    try {
        const seen = await prisma.seen.findFirst({
            where: {
                serieType,
                episodeId: parseInt(episodeId),
                userId: parseInt(userId)
            }
        });
        if (seen) {
            res.json(seen);
        } else {
            res.json({error: 'Enregistrement non trouvé.'})
        }
    } catch (error) {
        res.status(500).json({error: 'Erreur lors de la récupération de l\'enregistrement.'});
    }
});

router.delete('/:serieType/:userId/:episodeId', async (req: Request, res: Response) => {
    const {serieType, episodeId, userId} = req.params;
    try {
        await prisma.seen.deleteMany({
            where: {
                serieType,
                episodeId: parseInt(episodeId),
                userId: parseInt(userId)
            }
        });
        res.json({message: 'Enregistrement supprimé avec succès.'});
    } catch (error) {
        res.status(500).json({error: 'Erreur lors de la suppression de l\'enregistrement.'});
    }
});
export default router;