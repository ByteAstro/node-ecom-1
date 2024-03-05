const Product = require('../models/product.js');


exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        activeAddProduct: true,
        formCSS: true, productCSS: true,
    });
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('product-list', {
            prods: products, pageTitle: 'Shop', path: '/',
            hasProduct: products.length > 0,
            activeShop: true,
            formCSS: true, productCSS: true,
        });
    });
};