let Hotel = require('../data/Hotel');

module.exports = {
  index: (req, res) => {

    Hotel.find({}).sort({ date: -1 }).limit(20).then(hotels => {
      res.render('home/index', { hotels: hotels })
    })
  },
  about: (req, res) => {
    res.render('home/about')
  },
  getList: (req, res) => {
    let page = Number(req.query.page) | 1;
    let limit = 2;

    Hotel.count({}).then(hotelCount => {
      let maxPages = Math.ceil(hotelCount / limit);

      if (page > maxPages) {
        page = maxPages;
      }

      if (page < 0) {
        page = 1;
      }

      let pages = {
        nextPage: page + 1 > maxPages ? maxPages : page + 1,
        prevPage: page - 1 < 1 ? 1 : page - 1
      }

      Hotel.find({})
      .skip((page-1)*limit)
      .limit(limit)
      .then(hotels => {
        
        res.render('home/list', { hotels: hotels, pages: pages })
      })
    })
  }
}
