import connection from '../../database/database.js';

async function getRentals (req, res) {
    const { customerId, gameId } = req.query;
    try {
        if(!customerId && !gameId){
            const rentals = await connection.query(
                `SELECT 
                JSON_BUILD_OBJECT('id', games.id, 'name', games.name, 'categoryId',
                games."categoryId", 'categoryName', categories.name)
                AS game, 
                JSON_BUILD_OBJECT('id', customers.id, 'name', customers.name)
                AS customer, 
                rentals.*
                FROM rentals 
                LEFT JOIN customers ON rentals."customerId" = customers.id 
                LEFT JOIN games ON rentals."gameId" = games.id
                JOIN categories ON games."categoryId" = categories.id;`);
            return res.send(rentals.rows);
        }else{
            if(!gameId){
                const rentals = await connection.query(
                    `SELECT 
                    JSON_BUILD_OBJECT('id', games.id, 'name', games.name, 'categoryId',
                    games."categoryId", 'categoryName', categories.name)
                    AS game, 
                    JSON_BUILD_OBJECT('id', customers.id, 'name', customers.name)
                    AS customer, 
                    rentals.*
                    FROM rentals 
                    LEFT JOIN customers ON rentals."customerId" = customers.id 
                    LEFT JOIN games ON rentals."gameId" = games.id
                    JOIN categories ON games."categoryId" = categories.id
                    WHERE rentals."customerId" = $1;`,[customerId]);
                return res.send(rentals.rows);
            }
            if(!customerId){
                const rentals = await connection.query(
                    `SELECT 
                    JSON_BUILD_OBJECT('id', games.id, 'name', games.name, 'categoryId',
                    games."categoryId", 'categoryName', categories.name)
                    AS game, 
                    JSON_BUILD_OBJECT('id', customers.id, 'name', customers.name)
                    AS customer, 
                    rentals.*
                    FROM rentals 
                    LEFT JOIN customers ON rentals."customerId" = customers.id 
                    LEFT JOIN games ON rentals."gameId" = games.id
                    JOIN categories ON games."categoryId" = categories.id 
                    WHERE rentals."gameId" = $1;`,[gameId]);
                return res.send(rentals.rows);
            }
            const rentals = await connection.query(
                `SELECT 
                JSON_BUILD_OBJECT('id', games.id, 'name', games.name, 'categoryId',
                games."categoryId", 'categoryName', categories.name)
                AS game, 
                JSON_BUILD_OBJECT('id', customers.id, 'name', customers.name)
                AS customer, 
                rentals.*
                FROM rentals 
                LEFT JOIN customers ON rentals."customerId" = customers.id 
                LEFT JOIN games ON rentals."gameId" = games.id
                JOIN categories ON games."categoryId" = categories.id
                WHERE rentals."customerId" = $1 AND rentals."gameId" = $2;`,[customerId,gameId]);
            return res.send(rentals.rows);
        }
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
}

export default getRentals;