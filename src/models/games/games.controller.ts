import { Request, Response, NextFunction } from 'express';
import { GamesService } from './games.service';
import { CreateGamesDto } from './dto/create-game.dto';
import { UpdateGamesDto } from './dto/update-game.dto';


export class GamesController {
    async findAll(req: Request, res: Response, next: NextFunction) {
        const gamesService = new GamesService();
        const games = await gamesService.findAll();
        
        return res.status(200).json(games);
    }

    async findAllWithoutImages(req: Request, res: Response, next: NextFunction) {
        const gamesService = new GamesService();
        const games = await gamesService.findAllWithoutImages();

        return res.status(200).json(games);
    }

    async findOne(req: Request, res: Response, next: NextFunction) {
        const gamesService = new GamesService();
        const { id } = req.params;
        const game = await gamesService.findOne(id);

        return res.status(200).json(game);
    }

    async findByTitle(req: Request, res: Response, next: NextFunction) {
        const gamesService = new GamesService();
        const { title } = req.params;
        const game = await gamesService.findByTitle(title);

        return res.status(200).json(game);
    }
    
    async findByGenre(req: Request, res: Response) {
        const gamesService = new GamesService();
        const { genre } = req.params;
        const game = await gamesService.findByGenre(genre);

        return res.status(200).json(game);
    }

    async findByDeveloper(req: Request, res: Response) {
        const gamesService = new GamesService();
        const { developer } = req.params;
        const game = await gamesService.findByDeveloper(developer);

        return res.status(200).json(game);
    }

    async findTop(req: Request, res: Response) {
        const gamesService = new GamesService();
        const { console } = req.params;
        const game = await gamesService.findTop(console);

        return res.status(200).json(game);
    }

    async findAllDevelopers(req: Request, res: Response) {
        const gamesService = new GamesService();
        const game = await gamesService.findAllDevelopers();

        return res.status(200).json(game);
    }

    async findAllTitles(req: Request, res: Response) {
        const gamesService = new GamesService();
        const game = await gamesService.findAllTitles();

        return res.status(200).json(game);
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const gamesService = new GamesService();
        const game = await gamesService.create(req.body as CreateGamesDto);
        
        return res.status(201).json(game);
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const gamesService = new GamesService();
        const { id } = req.params;
        const game = await gamesService.update(id, req.body as UpdateGamesDto);

        return res.status(200).json(game);
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        const gamesService = new GamesService();
        const { id } = req.params;
        await gamesService.remove(id);

        return res.status(204).json();
    }
}
