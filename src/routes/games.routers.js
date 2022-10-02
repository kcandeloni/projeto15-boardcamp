import express from 'express';
import getGames from '../controllers/games_controllers/getGames.controllers.js';
import getGamesId from '../controllers/games_controllers/getGamesId.controllers.js';
import createGames from '../controllers/games_controllers/createGames.controllers.js';
import valideteGame from '../middlewares/validateGames.middlewares.js';

const gamesRouter = express.Router();
gamesRouter.get('/games', getGames);
gamesRouter.get('/games/:id', getGamesId);
gamesRouter.post('/games', valideteGame, createGames);

export default gamesRouter;