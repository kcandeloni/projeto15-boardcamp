import connection from '../database/database.js';

async function getCategoriesId (req, res) {
    const id = Number.isInteger(parseInt(req.params.id)) ? req.params.id : 0;
    try {
        const categoria = await connection.query(
          `SELECT * FROM categories WHERE categories.id = $1;`, [id]);
        res.send(categoria.rows[0]);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export default getCategoriesId;