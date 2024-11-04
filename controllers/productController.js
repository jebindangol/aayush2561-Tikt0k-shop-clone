const { Product } = require('../models');

async function addProduct(req, res) {
    const { name, description, price, category, tags, images } = req.body;
    const newProduct = await Product.create({
        name, description, price, category, tags, images, sellerId: req.user.userId
    });
    res.status(201).json(newProduct);
}

async function getProducts(req, res) {
    const products = await Product.findAll();
    res.json(products);
}

module.exports = { addProduct, getProducts };
