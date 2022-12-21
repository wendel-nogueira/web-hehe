import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';


export function ensureAuthenticated(req: Request, res: Response, next: NextFunction){
    const authToken = req.headers.authorization;

    if (!authToken){
        return res.status(401).end()
    }

    const [, token] = authToken.split(' ')

    try {
        const { sub } = verify(token, '0d2ee6d4da46bc6db53473efbf421395') as { sub: string }

        console.log(sub)

        return next()
    } catch (err) {
        return res.status(401).end()
    }

    return next()
}
