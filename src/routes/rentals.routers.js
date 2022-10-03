import express from 'express';
import getRentals from '../controllers/rentals_controllers/getRentals.controllers.js';
import createRentals from '../controllers/rentals_controllers/createRentals.controllers.js';
import validateRentals from '../middlewares/validateRentals.middlewares.js';

const rentalsRouter = express.Router();
rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals', validateRentals, createRentals);
//rentalsRouter.get('/rentals/:id', getCustomersId);
//rentalsRouter.put('/rentals/:id', validateCustomer, updateCustomers);

export default rentalsRouter;