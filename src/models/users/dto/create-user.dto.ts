import { IsNotEmpty, IsString } from 'class-validator';


export class CreateUserDto {
    @IsNotEmpty(
        { message: 'Email is required' },
    )
    @IsString(
        { message: 'Email must be a string' },
    )
    email: string;

    @IsNotEmpty(
        { message: 'Name is required' },
    )
    @IsString(
        { message: 'Name must be a string' },
    )
    name: string;

    @IsNotEmpty(
        { message: 'Username is required' },
    )
    @IsString(
        { message: 'Username must be a string' },
    )
    username: string;

    @IsNotEmpty(
        { message: 'Password is required' },
    )
    @IsString(
        { message: 'Password must be a string' },
    )
    password: string;
}
