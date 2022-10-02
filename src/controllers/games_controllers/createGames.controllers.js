import connection from '../../database/database.js';

async function createGames (req, res) {
    const {
        name,
        image,
        stockTotal,
        categoryId,
        pricePerDay } = req.body;
    
    connection.query(`INSERT INTO games 
    (name, image, "stockTotal", "categoryId", "pricePerDay") 
    VALUES ($1, $2, $3, $4, $5);`, 
    [name, image, stockTotal, categoryId, pricePerDay])
        .then( () => {
            res.sendStatus(201);
        });
}

export default createGames;