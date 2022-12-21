
import { IsNotEmpty, IsString, IsNumber, IsIn } from 'class-validator';
import { EnumConsole, ConsoleList } from '../enums/console.enum';
import { EnumGenre, GenreList } from '../enums/genre.enum';


export class CreateGamesDto {
    @IsNotEmpty(
        { message: 'Title is required' },
    )
    @IsString(
        { message: 'Title must be a string' },
    )
    title: string;

    @IsNotEmpty(
        { message: 'Summary is required' },
    )
    @IsString(
        { message: 'Summary must be a string' },
    )
    summary: string;
    
    @IsNotEmpty(
        { message: 'Developer is required' },
    )
    @IsString(
        { message: 'Developer must be a string' },
    )
    developer: string;

    @IsNotEmpty(
        { message: 'Genre is required' },
    )
    @IsIn(
        GenreList,
        { message: 'Genre must be a valid genre' },
    )
    genre: EnumGenre;

    @IsNotEmpty(
        { message: 'Console is required' },
    )
    @IsIn(
        ConsoleList,
        { message: 'Console must be a valid console' },
    )
    console: EnumConsole;

    @IsNotEmpty(
        { message: 'Image is required' },
    )
    @IsString(
        { message: 'Image must be a string' },
    )
    image: string;

    @IsNotEmpty(
        { message: 'Price is required' },
    )
    @IsNumber(
        {},
        { message: 'Price must be a number' },
    )
    price: number;
}
