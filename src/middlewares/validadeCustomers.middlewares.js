import connection from '../database/database.js';
import customerSchema from '../schemas/customers.schema.js';

async function valideteCustomer (req, res, next) {
    const { name, cpf, phone } = req.body;

    if(name === '' || name[0] === ' '){
        return res.sendStatus(400);
    }

    const validation = customerSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        console.log(validation.error.details.map(err => err.message))
        return res.sendStatus(400);
    }

    try {
        const uniqueCPF = await connection.query(
          `SELECT * FROM customers WHERE customers.cpf = $1;`, [cpf]);
        if(uniqueCPF.rows.length > 0){
            return res.sendStatus(409);
        }
        const uniquePhone = await connection.query(
            `SELECT * FROM customers WHERE customers.phone = $1;`, [phone]);
          if(uniquePhone.rows.length > 0){
              return res.sendStatus(409);
          }
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
    next();
}

export default valideteCustomer;