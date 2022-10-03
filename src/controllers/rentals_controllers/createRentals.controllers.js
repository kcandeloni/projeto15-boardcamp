import connection from '../../database/database.js';
import dayjs from 'dayjs';

async function createRentals (req, res) {
    const {
        customerId,
        gameId,
        daysRented } = req.body;

    const rentDate = dayjs().format('YYYY-MM-DD');

    try{
        //const originPrice = await connection.query(`SELECT "pricePerDay" FROM games WHERE games.id = $1;`,[gameId])
        const originPrice = res.locals.pricePerDay;
        console.log(originPrice);
        await connection.query(`INSERT INTO rentals 
        ("customerId", "gameId", "daysRented", "rentDate", "originalPrice") 
        VALUES ($1, $2, $3, $4, $5);`, 
        [customerId, gameId, daysRented, rentDate, originPrice*daysRented])
        
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export default createRentals;