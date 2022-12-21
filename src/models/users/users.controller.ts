import { Request, Response, NextFunction } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


export class UsersController {
    async findAll(req: Request, res: Response, next: NextFunction) {
        const usersService = new UsersService();
        const users = await usersService.findAll();
        
        return res.status(200).json(users);
    }

    async findOne(req: Request, res: Response, next: NextFunction) {
        const usersService = new UsersService();
        const { id } = req.params;
        const user = await usersService.findOne(id);

        return res.status(200).json(user);
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const usersService = new UsersService();
        const body = req.body as CreateUserDto;
        const user = await usersService.create(body);

        return res.status(201).json(user);
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const usersService = new UsersService();
        const { id } = req.params;
        const user = await usersService.update(id, req.body as UpdateUserDto);

        return res.status(200).json(user);
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        const usersService = new UsersService();
        const { id } = req.params;
        const user = await usersService.remove(id);

        return res.status(200).json(user);
    }
}
