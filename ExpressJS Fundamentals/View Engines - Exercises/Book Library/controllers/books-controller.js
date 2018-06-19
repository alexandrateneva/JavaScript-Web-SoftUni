const Book = require('../data/Book');

module.exports = {
    getAddBook: (req, res) => {
        res.render('addBook');
    },
    postAddBook: (req, res) => {
        let bookObj = req.body;

        console.log(bookObj);

        if (!bookObj.title || !bookObj.imageUrl) {
            res.render('addBook', { showErrorMsg: true, book: bookObj });
            return;
        }

        Book.create(bookObj).then(book => {
            res.render('addBook', { showSuccssesMsg: true });
        })
    },
    getAllBooks: (req, res) => {
        Book
            .find({})
            .sort('-releaseDate')
            .then(books => {
                res.render('viewAll', { books });
            })
    },
    getDetails: (req, res) => {
        let id = req.params.id;
        Book
        .findById(id)
        .then(book => {
            res.render('details', book);
        })
    }
}