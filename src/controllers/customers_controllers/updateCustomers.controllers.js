import connection from '../../database/database.js';

async function updateCustomers (req, res) {
    const id = Number.isInteger(parseInt(req.params.id)) ? req.params.id : 0;
    if(id === 0){
        return res.sendStatus(404);
    }

    const {
        name,
        phone,
        cpf,
        birthday } = req.body;

    const convertBirthday = [birthday.slice(4,8),
        birthday.slice(2,4),
        birthday.slice(0,2)].join('-');
        
    connection.query(`UPDATE customers SET
        name = $1,
        phone = $2,
        cpf = $3,
        birthday = $4 
        WHERE customers.id = $5;`, 
    [name, phone, cpf, convertBirthday, id])
        .then( () => {
            res.sendStatus(201);
        });
}

export default updateCustomers;