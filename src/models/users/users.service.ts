import { UsersRepository } from './repository/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersValidator } from './users.validator';
import { ObjectId } from 'mongodb';
import { hash } from 'bcryptjs';


export class UsersService {
    usersRepository: UsersRepository;

    constructor() {
        this.usersRepository = new UsersRepository();
    }

    async findAll() {
        return await this.usersRepository.findAll();
    }

    async findOne(id: string) {
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid ID');
        }

        return await this.usersRepository.findOne(id);
    }

    async create(user: CreateUserDto) {
        const usersValidator = new UsersValidator();
        await usersValidator.validateCreateUserDto(user);

        const emailExists = await this.usersRepository.findByEmail(user.email);

        if (emailExists) {
            throw new Error('Email already exists');
        }

        const usernameExists = await this.usersRepository.findByUsername(user.username);

        if (usernameExists) {
            throw new Error('Username already exists');
        }

        const hashedPassword = await hash(user.password, 8);
        user.password = hashedPassword;

        return await this.usersRepository.create(user);
    }

    async update(id: string, user: UpdateUserDto) {
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid ID');
        }

        return await this.usersRepository.update(id, user);
    }

    async remove(id: string) {
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid ID');
        }

        return await this.usersRepository.remove(id);
    }
}
