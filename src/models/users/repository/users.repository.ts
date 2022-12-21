import { IUsersRepository } from './i-users.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { PrismaClient } from '@prisma/client'


export class UsersRepository implements IUsersRepository {
    prisma: any;
    
    constructor() {
        this.prisma = new PrismaClient();
    }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async findOne(id: string): Promise<any> {
        return this.prisma.user.findUnique({
            where: {
                id: id
            }
        });
    }

    async findByEmail(email: string): Promise<any> {
        return this.prisma.user.findUnique({
            where: {
                email: email
            }
        });
    }

    async findByUsername(username: string): Promise<any> {
        return this.prisma.user.findUnique({
            where: {
                username: username
            }
        });
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.prisma.user.create({
            data: createUserDto
        });

        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.prisma.user.update({
            where: {
                id: id
            },
            data: updateUserDto
        });

        return user;
    }

    async remove(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: {
                id: id
            }
        });

        return;
    }
}
