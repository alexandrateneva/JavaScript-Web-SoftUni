const Product = require('../data/Product');

module.exports = {
    createGet: (req, res) => {
        let isAdmin = req.user && req.user.roles[0] === 'Admin';
        res.render('product/create-product', { isAdmin: isAdmin });
    },
    createPost: (req, res) => {
        let category = req.body.category;
        let imageUrl = req.body.imageUrl;
        let size = Number(req.body.size);
        let toppings = req.body.toppings.split(',').map(t => t.trim()).filter(t => t !== '');
        Product.create({ category, imageUrl, size, toppings })
            .then(product => {
                res.redirect('/');
            }).catch(err => {
                res.render('product/create-product', { product: { category, imageUrl, size, toppings }, error: err.message });
            })
    },
    editGet: (req, res) => {
        let isAdmin = req.user && req.user.roles[0] === 'Admin';
        let productId = req.params.id;

        Product.findById(productId).then(product => {
            res.render('product/edit-product', { product: product, isAdmin: isAdmin });
        })
    },
    editPost: (req, res) => {
        let category = req.body.category;
        let imageUrl = req.body.imageUrl;
        let size = Number(req.body.size);
        let toppings = req.body.toppings.split(',').map(t => t.trim()).filter(t => t !== '');

        let productId = req.params.id;

        Product.findByIdAndUpdate({ _id: productId }, { runValidators: true })
            .then(product => {
                product.category = category;
                product.imageUrl = imageUrl;
                product.size = size;
                product.toppings = toppings;

                product.save(function (err) {
                    if (err) {
                        return res.render('product/edit-product', { product: product, error: err.message });
                    }
                    else {
                        res.redirect('/');
                    }
                })
            })
    },
    deleteGet: (req, res) => {
        let productId = req.params.id;

        Product.findByIdAndRemove(productId)
            .then(product => {
                res.redirect('/');
            })
    }
}