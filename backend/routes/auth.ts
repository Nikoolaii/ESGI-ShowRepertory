import {Request, Response, Router} from 'express';
import prisma from '../prisma';
import bcrypt from 'bcrypt';
import JwtService from "../services/jwt-service";

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
    const email = req.body.email as string;
    const password = req.body.password as string;

    if (!email || !password) {
        return res.status(400).json({
            error: 'Email and password are required.'
        });
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            }
        });

        if (!user) {
            return res.status(404).json({
                error: 'User or password incorrect.'
            });
        }

        if (bcrypt.compareSync(password, user.password)) {
            const token = JwtService.sign({
                id: user.id,
                name: user.name,
                email: user.email
            });

            res.json({
                user: user,
                token: token
            });
        } else {
            return res.status(400).json({
                error: 'User or password incorrect.'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            error: 'Internal server error.'
        });
    }
});

router.post('/', async (req: Request, res: Response) => {
    const name = req.body.name as string;
    var password = req.body.password as string;
    const email = req.body.email as string;
    const confirmPassword = req.body.confirmPassword as string;

    if (!name || !password || !email) {
        return res.status(400).json({
            error: 'Username, password, and mail are required.'
        });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            error: 'Passwords do not match.'
        });
    }

    password = bcrypt.hashSync(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                name: name,
                password: password,
                email: email
            }
        });

        const token = JwtService.sign({
            id: user.id,
            name: user.name,
            email: user.email
        });

        res.json({
            user: user,
            token: token
        });

    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({
                error: 'Username or email already exists.'
            });
        }
        return res.status(500).json({
            error: 'Internal server error.'
        });
    }
});

router.post('/testLogin', async (req: Request, res: Response) => {
    const jwt = req.body.jwt as string;

    if (!jwt) {
        return res.status(400).json({
            result: false
        });
    }

    const result = JwtService.verify(jwt);

    if (result) {
        return res.status(200).json({
            result: true
        });
    } else {
        return res.status(400).json({
            result: false
        });
    }
});

export default router;
