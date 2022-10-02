import connection from '../../database/database.js';

async function getGames (req, res) {
    let { name } = req.query;
    try {
        if(!name){
            const games = await connection.query(
                `SELECT games.*, categories.name AS "categoryName" FROM games
                JOIN categories ON games."categoryId" = categories.id;`);
            res.send(games.rows);
        }
        else{
            name += '%';
            const game = await connection.query(`
                SELECT games.*, categories.name AS "categoryName" FROM games
                JOIN categories ON games."categoryId" = categories.id WHERE games.name LIKE $1;`, [name]);
            res.send(game.rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export default getGames;