import connection from '../../database/database.js';

async function getCustomersId (req, res) {
    const id = Number.isInteger(parseInt(req.params.id)) ? req.params.id : 0;
    try {
        const customer = await connection.query(
          `SELECT * FROM customers WHERE customers.id = $1;`, [id]);
        if(customer.rows?.length < 1){
            return res.sendStatus(404);
        }
        res.send(customer.rows[0]);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export default getCustomersId;