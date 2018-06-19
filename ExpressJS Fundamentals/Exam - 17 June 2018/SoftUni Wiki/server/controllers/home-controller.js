const Article = require('../data/Article');
const Edit = require('../data/Edit');

module.exports = {
  index: (req, res) => {

    Article.find({}).sort({ creationDate: -1 }).limit(4).then(articles => {
      if (articles.length > 0) {
        let latestArticle = articles[0];
        let latestArticleId = articles[0]._id;

        Edit.find({ article: latestArticleId }).sort({ creationDate: -1 }).then(edits => {
          let content = edits[0].content;
          latestArticle.content = content.split(/\s+/).slice(0, 50).join(" ");

          return res.render('home/index', { latestArticle: latestArticle, articles: articles.slice(1, 4) });

        }).catch(err => {
          res.locals.globalError = err;
          return res.render('home/index');
        })
      }
      else {
        res.locals.globalError = 'There are no articles in database!'
        return res.render('home/index');
      }
    }).catch(err => {
      res.locals.globalError = err;
      return res.render('home/index');
    })
  }
}
