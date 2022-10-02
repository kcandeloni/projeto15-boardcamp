import connection from '../database/database.js';
import gameSchema from '../schemas/games.schema.js';

async function valideteGame (req, res, next) {
    const { name, categoryId } = req.body;

    if(name === '' || name[0] === ' '){
        return res.sendStatus(400);
    }

    const validation = gameSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        console.log(validation.error.details.map(err => err.message))
        return res.sendStatus(400);
    }

    try {
        const unique = await connection.query(
          `SELECT * FROM games WHERE games.name = $1;`, [name]);
        if(unique.rows.length > 0){
            return res.sendStatus(409);
        }
        const existCategory = await connection.query(
            `SELECT * FROM categories WHERE categories.id = $1;`, [categoryId]);
          if(existCategory.rows.length < 1){
              return res.sendStatus(400);
          }
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
    next();
}

export default valideteGame;