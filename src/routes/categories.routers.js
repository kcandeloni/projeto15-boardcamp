import express from 'express';
import getCategories from '../controllers/getCategories.controllers.js';
import getCategoriesId from '../controllers/getCategoriesId.controllers.js';
import createCategories from '../controllers/createCategories.controllers.js';
import valideteCategorie from '../middlewares/valideteCategories.middlewares.js';

const categoriesRouter = express.Router();
categoriesRouter.get('/categories', getCategories);
categoriesRouter.get('/categories/:id', getCategoriesId);
categoriesRouter.post('/categories', valideteCategorie, createCategories);

export default categoriesRouter;