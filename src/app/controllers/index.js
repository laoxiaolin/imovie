var Movie    = require('../models/movie')
var Category  = require('../models/category')

//index page
exports.index = (req, res) => {
    Category
        .find({})
        .populate({
            path: 'movies',
            options: { limit: 8 }
        })
        .exec(function(err, categories){
            if (err) {
                console.log(err)
            }

            res.render('index', {
                title: '妹妹电影网-首页',
                categories: categories
            })

        })
}