const { knexP } = require('../options/mariaDB.js');
/* const knex = require('knex')(options); */
/* const { default: knex } = require("knex") */

const products = [
    {
        id: "1",
        image: "https://dl.dropboxusercontent.com/s/ig08109teihkjv1/YerberaNegra.jpeg?dl=0",
        name: "Yerbera negra", 
        description: "Yerbera con pico vertedor grande, flores fondo negro.", 
        price: 1116, 
        stock: 2, 
        category: "2"
    },
    {
        id: "2", 
        image: "https://dl.dropboxusercontent.com/s/rg3e81ppjrag2du/WhatsApp%20Image%202021-12-23%20at%2012.42.29.jpeg?dl=0",
        name: "Escurridor", 
        description: "Escurridor de cubiertos, cepillos o pinceles.", 
        price: 552, 
        stock: 7, 
        category: "1"
    },
    {
        id: "3", 
        image: "https://dl.dropboxusercontent.com/s/ektd5b6ie2nyfnr/MateShine.jpeg?dl=0",
        name: "Mate shine", 
        description: "Mate shine glitter con asa, bombilla y sistema de vaciado.", 
        price: 506, 
        stock: 5, 
        category: "1"
    },
    {
        id: "4", 
        image: "https://dl.dropboxusercontent.com/s/cs8y8w1766s6ool/YerberaRosa.jpeg?dl=0",
        name: "Yerbera rosa", 
        description: "Yerbera con pico vertedor grande, modelo flores rosa.", 
        price: 1116, 
        stock: 12, 
        category: "2"
    },
    {
        id: "5", 
        image: "https://dl.dropboxusercontent.com/s/e0u8zmcztr2zjqq/SetYyA.jpeg?dl=0",
        name: "Set yerbera y azucarera", 
        description: "Set yerbera y azucarera de hojalata, modelo terrazo.", 
        price: 1182, 
        stock: 15, 
        category: "2"
    }    
]

function dropTable() {
    knexP.schema.dropTableIfExists("products")
        .then(() => { console.log("Tabla borrada") })
        .catch(err => { console.log(err) })
}

function createTable() {
    knexP.schema.createTable("products", table => {
        table.increments("id")
        table.string("image")
        table.string("name")
        table.string("description")
        table.integer("price")
        table.integer("stock")
        table.integer("category")
    })
        .then(() => { console.log("Tabla creada") })
        .catch(err => { console.log(err) })

    knexP("products").insert(products)
        .then( () => { console.log("Productos agregados"); } )
        .catch( (err) => { console.log(err); throw err } )
}

function getProducts() {
    knexP.from("products").select("*")
        .then(data => { return data })
        .catch(err => { console.log(err); throw err })
}

function saveProduct(product) {
    knexP("products").insert(product)
        .then(() => { console.log("Producto guardado") })
        .catch(err => { console.log(err); throw err })
}

module.exports = { dropTable, createTable, getProducts, saveProduct }