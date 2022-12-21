import { Router } from 'express';
import { UsersController } from './models/users/users.controller';
import { GamesController } from './models/games/games.controller';
import { ReviewsController } from './models/reviews/reviews.controller';
import { AuthController } from './auth/auth.controller';
import { ensureAuthenticated } from './guard/ensureAuthenticate';


const router = Router();
const usersController = new UsersController();
const gamesController = new GamesController();
const reviewsController = new ReviewsController();
const authController = new AuthController();


//  Auth
router.post('/login', authController.login);
router.get('/me', ensureAuthenticated, authController.me);

//  Users
router.get('/users', usersController.findAll);
router.get('/users/:id', usersController.findOne);
router.post('/users', usersController.create);
router.patch('/users/:id', ensureAuthenticated, usersController.update);
router.delete('/users/:id', ensureAuthenticated, usersController.remove);

//  Games
router.get('/games', gamesController.findAll);
router.get('/games/:id', gamesController.findOne);
router.get('/games/title/:title', gamesController.findByTitle);
router.get('/games/genre/:genre', gamesController.findByGenre);
router.get('/games/developer/:developer', gamesController.findByDeveloper);
router.get('/games/top/:console', gamesController.findTop);
router.get('/games/developers/all', gamesController.findAllDevelopers);
router.get('/games/titles/all', gamesController.findAllTitles);
router.get('/games/noimage/all', gamesController.findAllWithoutImages);
router.post('/games', gamesController.create);
router.patch('/games/:id', gamesController.update);
router.delete('/games/:id', gamesController.remove);
router.post('/games', ensureAuthenticated, gamesController.create);
router.patch('/games/:id', ensureAuthenticated, gamesController.update);
router.delete('/games/:id', ensureAuthenticated, gamesController.remove);

//  Reviews
router.get('/games/:gameId/reviews', reviewsController.findAll);
router.get('/games/:gameId/reviews/:id', reviewsController.findOne);
router.post('/games/:gameId/reviews', ensureAuthenticated, reviewsController.create);
router.patch('/games/:gameId/reviews/:id', ensureAuthenticated, reviewsController.update);
router.delete('/games/:gameId/reviews/:id', ensureAuthenticated, reviewsController.remove);


export { router };