import connection from '../../database/database.js';
import dayjs from 'dayjs';

async function rentFinalize (req, res) {
    const id = Number.isInteger(parseInt(req.params.id)) ? parseInt(req.params.id) : 0;
    try {
        const rentals = await connection.query(
            `SELECT * FROM rentals WHERE id = $1;`,[id]);
        if(rentals?.rows?.length < 1){    
            return res.sendStatus(404);
        }
        if(rentals?.rows[0]?.returnDate !== null){
            return res.sendStatus(400);
        }
        const returnDate = dayjs().format('YYYY-MM-DD');
        
        const daysDelay = Math.trunc((dayjs() - rentals.rows[0].rentDate)/ 86400000) - rentals.rows[0].daysRented;
        const delayFee = daysDelay > 0 ? daysDelay*rentals.rows[0].originalPrice : 0;

        await connection.query(
            `UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 
            WHERE id = $3;`,
            [returnDate, delayFee, id]);

        return res.sendStatus(200);
       
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
}

export default rentFinalize;