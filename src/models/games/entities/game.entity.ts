import { EnumConsole } from '../enums/console.enum';
import { EnumGenre } from '../enums/genre.enum';
import { Review } from '../../reviews/types/review.type';


export class Game {
    id: string;
    title: string;
    summary: string;
    developer: string;
    genre: EnumGenre;
    console: EnumConsole;
    image: string;
    price: number;
    reviews: Review[];
    createdAt: Date;
    updatedAt: Date;
    
    constructor(partial: Partial<Game>) {
        Object.assign(this, partial);
    }
}
