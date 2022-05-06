const express = require('express');
const routerProducts = require('./routes/index.js')
const { dropTable, createTable, saveProduct, getProducts } = require('./controllers/containerProd.js')
const { dropMessagesTable, createMessagesTable, saveMessage, getMessages } = require('./controllers/containerMessages.js')

const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const ioServer = new IOServer(httpServer);

const handlebars = require('express-handlebars');


app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/public/views/layouts',
        partialsDir: __dirname + '/public/views/partials'
    })        
)
    
app.set('view engine', 'hbs');

app.set("views", "./public/views")

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/', routerProducts)
app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.render('main');
})


const PORT = 8080

httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

/* const dataMessages = [
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
] */

dropTable()
createTable()
dropMessagesTable()
createMessagesTable()


ioServer.on('connection', async (socket) => {
    console.log('Nueva conexión')
    
    const dataMessages = await getMessages()
    socket.emit('messages', dataMessages);
    socket.on('new-message', async (message) => {
        await saveMessage(message)
        ioServer.sockets.emit('messages', await dataMessages)
    });

    const dataProducts = await getProducts()
    socket.emit('products', dataProducts);
    socket.on('new-product', async (product) => {
        await saveProduct(product)
        ioServer.sockets.emit('products', await dataProducts)
    });

})