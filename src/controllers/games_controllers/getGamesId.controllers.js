import connection from '../../database/database.js';

async function getGamesId (req, res) {
    const id = Number.isInteger(parseInt(req.params.id)) ? req.params.id : 0;
    try {
        const game = await connection.query(
            `SELECT games.*, categories.name AS "categoryName" FROM games
            JOIN categories ON games."categoryId" = categories.id WHERE games.id = $1;`, [id]);
        res.send(game.rows[0]);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export default getGamesId;