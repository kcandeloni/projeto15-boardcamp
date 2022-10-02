import connection from '../../database/database.js';

async function getCategories (req, res) {
    try {
        const categories = await connection.query(
        `SELECT * FROM categories;`
        );
  
        res.send(categories.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export default getCategories;