const Hotel = require('../data/Hotel');
const Category = require('../data/Category');
const Comment = require('../data/Comment');
const User = require('../data/User');

module.exports = {
    createGet: (req, res) => {
        Category.find({}).then(categories => {
            res.render('hotels/addHotel', { categories: categories });
        })
    },
    createPost: (req, res) => {
        let title = req.body.title;
        let imageUrl = req.body.imageUrl;
        let description = req.body.description;
        let location = req.body.location;
        let category = req.body.category;
        let creator = req.user.username;

        Category.find({}).then(categories => {
            Hotel.create({ title, imageUrl, description, category, location, creator })
                .then(hotel => {
                    Category.findOneAndUpdate({ name: category }, { $push: { hotels: hotel._id } })
                        .then(category => {
                            res.redirect('/');
                        })
                }).catch(err => {
                    res.locals.globalError = err
                    res.render('hotels/addHotel', { hotel: { title, imageUrl, description, category, location }, categories: categories });
                })
        })
    },
    detailsGet: (req, res) => {
        let id = req.params.id;

        Hotel.findByIdAndUpdate(id).populate('comments').then(hotel => {
            if (hotel.creator !== req.user.username) {
                hotel.views++;
                hotel.save();
            }

            res.render('hotels/details', { selectedHotel: hotel })
        })
    },
    createCommentPost: (req, res) => {
        let hotelId = req.params.id;
        let title = req.body.title;
        let content = req.body.content;
        let creator = req.user.username;

        Comment.create({ title, content, creator, hotel: hotelId })
            .then(comment => {
                Hotel.findOneAndUpdate({ _id: hotelId }, { $push: { comments: comment._id } })
                    .then(hotel => {
                        res.redirect(`/hotel/${hotelId}`);
                    })
            }).catch(err => {
                res.locals.globalError = err
                res.redirect(`/hotel/${hotelId}`);
            })
    },
    likeGet: (req, res) => {
        let id = req.params.id;

        Hotel.findByIdAndUpdate(id, { $addToSet: { likes: req.user.username } })
            .populate('comments')
            .then(hotel => {
                User.findByIdAndUpdate(req.user._id).then(user => {
                    if (hotel.creator !== req.user.username) {
                        hotel.views--;
                        hotel.save();
                    }

                    res.redirect(`/hotel/${hotel._id}`)
                })
            }).catch(err => {
                res.locals.globalError = err
                res.redirect(`/hotel/${hotel._id}`)
            })
    },
    dislikeGet: (req, res) => {
        let id = req.params.id;

        Hotel.findByIdAndUpdate(id, { $pull: { likes: req.user.username } })
            .populate('comments')
            .then(hotel => {
                User.findByIdAndUpdate(req.user._id).then(user => {
                    if (hotel.creator !== req.user.username) {
                        hotel.views--;
                        hotel.save();
                    }

                    res.redirect(`/hotel/${hotel._id}`)
                })
            }).catch(err => {
                res.locals.globalError = err
                res.redirect(`/hotel/${hotel._id}`)
            })
    }
}