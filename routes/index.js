const express = require('express');
const { Router } = express
const { getProducts } = require('../controllers/containerProd.js')

const routerProducts = Router()

routerProducts.get('/', async (req, res) => {
    let products = await getProducts()
    res.render('main', { products: products })
})

module.exports = routerProducts