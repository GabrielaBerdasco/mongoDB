const knexC = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './db/database.sqlite'
    },
    useNullAsDefault: true
});

module.exports = { knexC };