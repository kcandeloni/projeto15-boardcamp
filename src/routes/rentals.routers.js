import express from 'express';
import getRentals from '../controllers/rentals_controllers/getRentals.controllers.js';
import createRentals from '../controllers/rentals_controllers/createRentals.controllers.js';
import validateRentals from '../middlewares/validateRentals.middlewares.js';
import rentFinalize from '../controllers/rentals_controllers/finalizeRentals.controllers.js';

const rentalsRouter = express.Router();
rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals', validateRentals, createRentals);
rentalsRouter.post('/rentals/:id/return', rentFinalize);
//rentalsRouter.put('/rentals/:id', validateCustomer, updateCustomers);

export default rentalsRouter;