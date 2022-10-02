import express from 'express';
import getCustomers from '../controllers/customers_controllers/getCustomers.controllers.js';
import validateCustomer from '../middlewares/validadeCustomers.middlewares.js';
import createCustomers from '../controllers/customers_controllers/createCustomer.controllers.js';
import getCustomersId from '../controllers/customers_controllers/getCustomersId.controllers.js';
import updateCustomers from '../controllers/customers_controllers/updateCustomers.controllers.js';

const customersRouter = express.Router();
customersRouter.get('/customers', getCustomers);
customersRouter.get('/customers/:id', getCustomersId);
customersRouter.post('/customers', validateCustomer, createCustomers);
customersRouter.put('/customers/:id', validateCustomer, updateCustomers);


export default customersRouter;