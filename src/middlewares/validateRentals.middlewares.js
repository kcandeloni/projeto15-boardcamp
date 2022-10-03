import connection from '../database/database.js';
import rentalsSchema from '../schemas/rentals.schema.js';

async function validateRentals (req, res, next) {
    const {
        customerId,
        gameId} = req.body;

    const validation = rentalsSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        console.log(validation.error.details.map(err => err.message))
        return res.sendStatus(400);
    }

    try {
        const valideCustumer = await connection.query(
          `SELECT * FROM customers WHERE id = $1;`, [customerId]);
        if(valideCustumer.rows.length < 1){
            return res.sendStatus(400);
        }
        const valideGame = await connection.query(
            `SELECT * FROM games WHERE id = $1;`, [gameId]);

        const getRentalsGame = await connection.query(
            `SElECT * FROM rentals WHERE "gameId" = $1;`, [gameId]);

          if(valideGame.rows.length < 1 || 
            valideGame?.rows[0]?.stockTotal <= getRentalsGame?.rows?.length){
              return res.sendStatus(400);
          }
          res.locals.pricePerDay = valideGame?.rows[0]?.pricePerDay;
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
    
    next();
}

export default validateRentals;