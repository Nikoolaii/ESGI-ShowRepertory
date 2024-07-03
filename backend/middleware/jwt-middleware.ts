import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const decodedToken = jwt.verify(token!, process.env.JWT_SECRET!);
            if (decodedToken) {
                next();
            } else {
                res.status(401).json({error: 'Unauthorized'});
            }
        }

    } catch (error) {
        res.status(401).json({error: "Unauthorized"});
    }
};

export default jwtMiddleware;