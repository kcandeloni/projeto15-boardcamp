import connection from '../database/database.js';
import categorieSchema from '../schemas/categories.Schema.js';

async function valideteCategorie (req, res, next) {
    const { name } = req.body;

    if(name === '' || name[0] === ' '){
        return res.sendStatus(400);
    }

    const validation = categorieSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        console.log(validation.error.details.map(err => err.message))
        return res.sendStatus(422);
    }

    try {
        const unique = await connection.query(
          `SELECT * FROM categories WHERE categories.name = $1;`, [name]);
        if(unique.rows.length > 0){
            return res.sendStatus(409);
        }
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
    next();
}

export default valideteCategorie;