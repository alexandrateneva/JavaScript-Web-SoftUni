const Category = require('../data/Category');

module.exports = {
    createGet: (req, res) => {
        res.render('categories/addCategory');
    },
    createPost: (req, res) => {
        let name = req.body.name;

        Category.create({ name })
            .then(Category => {
                res.redirect('/');
            }).catch(err => {
                res.locals.globalError = err
                res.render('categories/addCategory', { name });
            })
    }
}