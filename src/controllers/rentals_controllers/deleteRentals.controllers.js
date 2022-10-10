import connection from '../../database/database.js';

async function deleteRentals (req, res) {
    const id = Number.isInteger(parseInt(req.params.id)) ? parseInt(req.params.id) : 0;
    try {
        const rentals = await connection.query(
            `SELECT * FROM rentals WHERE id = $1;`,[id]);
        if(rentals?.rows?.length < 1){    
            return res.sendStatus(404);
        }
        if(rentals?.rows[0]?.returnDate === null){
            return res.sendStatus(400);
        }

        await connection.query(
            `DELETE FROM rentals WHERE id = $1;`, [id]);

        return res.sendStatus(200);
       
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
}

export default deleteRentals;