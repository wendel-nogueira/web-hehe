import { EnumConsole } from '../enums/console.enum';
import { EnumGenre } from '../enums/genre.enum';


export class UpdateGamesDto {
    title?: string;
    summary?: string;
    developer?: string;
    genre?: EnumGenre;
    console?: EnumConsole;
    image?: string;
    price?: number;
}
