import connection from '../../database/database.js';

async function getGames (req, res) {
    try {
        const games = await connection.query(
            `SELECT games.*, categories.name AS "categoryName" FROM games
            JOIN categories ON games."categoryId" = categories.id;`);
        res.send(games.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export default getGames;