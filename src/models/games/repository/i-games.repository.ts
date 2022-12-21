import { CreateGamesDto } from '../dto/create-game.dto';
import { UpdateGamesDto } from '../dto/update-game.dto';
import { Game } from '../entities/game.entity';


export interface IGamesRepository {
    findAll(): Promise<Game[]>;
    findOne(id: string): Promise<any>;
    create(createGameDto: CreateGamesDto): Promise<Game>;
    update(id: string, updateGameDto: UpdateGamesDto): Promise<Game>;
    remove(id: string): Promise<void>;
}
