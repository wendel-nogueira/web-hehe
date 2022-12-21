import { UsersRepository } from '../models/users/repository/users.repository';
import { verify, sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';


export class AuthService {
    usersRepository: UsersRepository;

    constructor() {
        this.usersRepository = new UsersRepository();
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            return null;
        }

        const passwordMatch = await compare(password, user.password);

        if (passwordMatch) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(user: any) {
        const token = sign(
            { 
                name: user.name,
                username: user.username,
                email: user.email,
            }, 
            '0d2ee6d4da46bc6db53473efbf421395', 
            { subject: user.id, expiresIn: "1d"}
        );

        return {
            access_token: token,
        };
    }

    async decodeToken(token: string) {
        const decoded = verify(token, '0d2ee6d4da46bc6db53473efbf421395', { subject: 'id' });

        return decoded;
    }
}