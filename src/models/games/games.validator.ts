import { CreateGamesDto } from './dto/create-game.dto';
import { validateOrReject } from 'class-validator';

export class GamesValidator {
    async validateCreateGamesDto(game: CreateGamesDto) {
        const validateUser = new CreateGamesDto();

        validateUser.title = game.title;
        validateUser.summary = game.summary;
        validateUser.developer = game.developer;
        validateUser.genre = game.genre;
        validateUser.console = game.console;
        validateUser.image = game.image;
        validateUser.price = game.price;

        await validateOrReject(validateUser).catch(errors => {
            const errorMessage: any = errors.map((error: { constraints: any; }) => {
                return Object.values(error.constraints).map((constraint: any) => {
                    return constraint;
                });
            });

            throw new Error(JSON.stringify(errorMessage));
        });
    }
}
