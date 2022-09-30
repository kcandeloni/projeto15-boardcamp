import connection from '../database/database.js';

async function createCategories (req, res) {
    const { name } = req.body;
    
    connection.query('INSERT INTO categories (name) VALUES ($1);', [name])
        .then( () => {
            res.sendStatus(201);
        });
}

export default createCategories;