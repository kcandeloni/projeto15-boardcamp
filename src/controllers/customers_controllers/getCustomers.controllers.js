import connection from '../../database/database.js';

async function getCustomers (req, res) {
    let { cpf } = req.query;
    try {
        if(!cpf){
            const customers = await connection.query(
                `SELECT * FROM customers;`);
            res.send(customers.rows);
        }else{
            cpf += '%';
            const customers = await connection.query(
                `SELECT * FROM customers WHERE cpf LIKE $1;`, [cpf]);
            res.send(customers.rows);
        }
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
}

export default getCustomers;