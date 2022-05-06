const { knexC } = require('../options/sqlite3.js');

const dataMessages = [
    {
        author: 'Jose', 
        text: 'Hola',
        date: "Wed Apr 20 2022 18:22:41 GMT-0300 (hora estándar de Argentina)"
    }, 
    {
        author: 'Nico', 
        text: 'Hola',
        date: "Wed Apr 20 2022 18:22:41 GMT-0300 (hora estándar de Argentina)"
    }, 
    {
        author: 'Ignacio', 
        text: 'Hola',
        date: "Wed Apr 20 2022 18:22:41 GMT-0300 (hora estándar de Argentina)"
    }
]

function dropMessagesTable() {
    knexC.schema.dropTableIfExists('messages')
        .then(() => { console.log('Tabla messages eliminada') } )
        .catch(err => { console.log(err) })
}

function createMessagesTable() {
    knexC.schema.createTable('messages', (table) => {
        table.increments('id').primary();
        table.string('author');
        table.string('text');
        table.dateTime('date');
    })
    .then(() => { console.log('Tabla messages creada') } )
    .catch(err => { console.log(err) })

    knexC('messages').insert(dataMessages)
        .then(() => { console.log('Mensajes agregados') } )
        .catch(err => { console.log(err); throw err }) 
}

function getMessages() {
    knexC.from('messages').select('*')
        .then(messages => messages)
        .catch(err => { console.log(err); throw err })
}

function saveMessage(message) {
    knexC('messages').insert(message)
        .then(() => { console.log('Mensaje agregado') } )
        .catch(err => { console.log(err); throw err })
}

module.exports = { dropMessagesTable, createMessagesTable, getMessages, saveMessage }