import { AuthService } from './auth.service';
import { Request, Response, NextFunction } from 'express';
import { decode } from 'jsonwebtoken';


export class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        const authService = new AuthService();
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = await authService.validateUser(email, password);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = await authService.login(user);

        return res.status(200).json(token);
    }

    async me(req: Request, res: Response, next: NextFunction) {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const [, token] = authorization.split(' ');

        try {
            const decoded = decode(token);

            return res.status(200).json(decoded);
        } catch (error) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    }
}