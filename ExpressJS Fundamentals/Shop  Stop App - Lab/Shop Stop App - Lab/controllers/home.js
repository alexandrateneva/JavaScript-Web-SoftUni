const Product = require('../models/Product');

module.exports.index = (req, res) => {
    let queryData = req.query;

    Product.find({ buyer: null }).populate('category').then((products) => {
        if (queryData.query) {
            products = products.filter(p => p.name.toLowerCase().includes(queryData.query.toLocaleLowerCase()));
        }

        let data = { products: products };
        products.forEach(element => {
            if ((req.user && element.creator.equals(req.user._id)) || (req.user && req.user.roles.indexOf('Admin') >= 0)) {
                element.isCreator = true;
            }
        });
        if (req.query.error) {
            data.error = req.query.error;
        } else if (req.query.success) {
            data.success = req.query.success;
        }
        res.render('home/index', data);
    })
}