import connection from '../../database/database.js';

async function createCustomers (req, res) {
    const {
        name,
        phone,
        cpf,
        birthday } = req.body;

    const convertBirthday = [birthday.slice(4,8),
        birthday.slice(2,4),
        birthday.slice(0,2)].join('-');

    connection.query(`INSERT INTO customers 
    (name, phone, cpf, birthday) 
    VALUES ($1, $2, $3, $4);`, 
    [name, phone, cpf, convertBirthday])
        .then( () => {
            res.sendStatus(201);
        });
}

export default createCustomers;