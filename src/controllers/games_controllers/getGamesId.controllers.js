import connection from '../../database/database.js';

async function getGamesId (req, res) {
    const name = req.params.name;
    try {
        const game = await connection.query(
            `SELECT games.*, categories.name AS "categoryName" FROM games
            JOIN categories ON games."categoryId" = categories.id WHERE games.name LIKE '$1%';`, [name]);
        res.send(game.rows[0]);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export default getGamesId;