const Article = require('../data/Article');
const Edit = require('../data/Edit');

module.exports = {
    createGet: (req, res) => {
        res.render('articles/create');
    },
    createPost: (req, res) => {
        let reqArticle = req.body;
        let title = reqArticle.title.trim();
        let content = reqArticle.content.trim();
        let author = req.user._id;
        let creationDate = Date.now();

        Article.create({ title: title, creationDate: creationDate }).then(article => {
            let articleId = article._id;

            Edit.create({ author: author, creationDate: creationDate, content: content, article: articleId })
                .then(edit => {
                    article.edits.push(edit._id);
                    article.save();

                    return res.redirect('/');
                })
                .catch(err => {
                    res.locals.globalError = err
                    return res.render('articles/create');
                })
        })
            .catch(err => {
                res.locals.globalError = err
                return res.render('articles/create');
            })
    },
    allGet: (req, res) => {
        Article.find({}).sort({ title: 1 }).then(articles => {
            if (articles.length > 0) {
                return res.render('articles/all', { articles: articles });
            }
            else {
                res.locals.globalError = 'There are no articles in database!'
                return res.render('articles/all');
            }
        }).catch(err => {
            res.locals.globalError = err;
            return res.render('articles/all');
        })
    },
    detailsGet: (req, res) => {
        let id = req.params.id;

        Article.findById(id).then(article => {

            Edit.find({ article: id }).sort({ creationDate: -1 }).then(edits => {
                let content = edits[0].content;
                article.content = content;

                return res.render('articles/article', { article: article });

            }).catch(err => {
                res.locals.globalError = err;
                return res.render('articles/article');
            })

        }).catch(err => {
            res.locals.globalError = err;
            return res.render('articles/article');
        })
    },
    editGet: (req, res) => {
        let id = req.params.id;

        Article.findById(id).then(article => {

            let isLocked = article.lockedStatus;
            let isAdmin = req.user.roles[0] === 'Admin';

            if (isLocked) {
                if (isAdmin) {
                    editArticleGet();
                } else {
                    res.locals.globalError = 'Only admins can edit locked articles.'
                    return res.render('home/index');
                }
            } else {
                editArticleGet();
            }

            function editArticleGet() {
                Edit.find({ article: id }).sort({ creationDate: -1 }).then(edits => {
                    let content = edits[0].content;
                    article.content = content;

                    return res.render('articles/edit', { article: article });

                }).catch(err => {
                    res.locals.globalError = err;
                    return res.render('articles/edit');
                })

            }
        }).catch(err => {
            res.locals.globalError = err;
            return res.render('articles/edit');
        })
    },
    editPost: (req, res) => {
        let articleId = req.params.id;
        let content = req.body.content.trim();
        let author = req.user._id;
        let creationDate = Date.now();

        Article.findById(articleId).then(article => {

            let isLocked = article.lockedStatus;

            if (isLocked) {
                if (req.user.roles[0] === 'Admin') {
                    editArticlePost();
                } else {
                    res.locals.globalError = 'Only admins can edit locked articles.'
                    return res.render('home/index');
                }
            } else {
                editArticlePost();
            }

            function editArticlePost() {
                Edit.create({ author: author, creationDate: creationDate, content: content, article: articleId })
                    .then(edit => {
                        article.edits.push(edit._id);
                        article.save();

                        return res.redirect('/');
                    })
                    .catch(err => {
                        res.locals.globalError = err
                        return res.render('articles/edit');
                    })
            }
        }).catch(err => {
            res.locals.globalError = err
            return res.render('home/index');
        })

    },
    historyGet: (req, res) => {
        let articleId = req.params.id;

        Edit.find({ article: articleId }).sort({ creationDate: -1 }).populate('author').then(edits => {
            return res.render('articles/history', { edits: edits })
        }).catch(err => {
            res.locals.globalError = err
            return res.render('home/index');
        })
    },
    currentEditGet: (req, res) => {
        let editId = req.params.id;

        Edit.findById(editId).then(edit => {
            let content = edit.content;

            Article.findById(edit.article).then(article => {
                let oldArticle = {
                    _id: article._id,
                    content: content,
                    title: article.title
                }

                return res.render('articles/article', { article: oldArticle });
            })

        }).catch(err => {
            res.locals.globalError = err;
            return res.render('home/index');
        })
    },
    lastArticleGet: (req, res) => {
        Article.find({}).sort({ creationDate: -1 }).then(articles => {
            if (articles.length > 0) {
                let latestArticleId = articles[0]._id;
                return res.redirect(`/article/${latestArticleId}`);
            }
            else {
                res.locals.globalError = 'There are no articles in database!'
                return res.render('home/index');
            }
        }).catch(err => {
            res.locals.globalError = err;
            return res.render('home/index');
        })
    },
    lockUnlockGet: (req, res) => {
        let articleId = req.params.id;

        Article.findById(articleId).then(article => {
            article.lockedStatus = !article.lockedStatus
            article.save();

            return res.redirect(`/article/${article._id}`);
        }).catch(err => {
            res.locals.globalError = err;
            return res.render('home/index');
        })
    },
    searchPost: (req, res) => {
        let title = req.body.title.trim().toLowerCase();

        Article.find({}).sort({ title: 1 }).then(articles => {

            articles = articles.filter(a => a.title.toLowerCase().includes(title));

            if (articles.length > 0) {
                return res.render('articles/all', { articles: articles });
            }
            else {
                res.locals.globalError = 'There are no articles with this name in database!'
                return res.render('articles/all');
            }
        }).catch(err => {
            res.locals.globalError = err;
            return res.render('articles/all');
        })
    }
}