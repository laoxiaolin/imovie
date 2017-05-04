var Movie    = require('../models/movie')
var Category  = require('../models/category')

//index page
exports.index = (req, res) => {
  Category
    .find({})
    .populate({
        path: 'movies',
        select: 'title poster',
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



//front:search movie action
exports.search = (req, res) => {
   var catId = req.query.cat
   var page  = parseInt(req.query.p) || 0
   var q     = req.query.q
   var count = 2
   var index = page * count
   if (catId){
       Category
        .find({_id: catId})
        .populate({
            path: 'movies',
            select: 'title poster',
        })
        .exec((err, categories) =>{
            if (err) {
                console.log(err)
            }

            var category = categories[0] || {}
            var movies = category.movies || []
            var results = movies.slice(index, index + count)

            // console.log(page+1)
            res.render('movie/result', {
                title: '妹妹电影网-列表页',
                query: 'cat=' + catId,
                keyword: category.name,
                currentPage: page+1,
                totalPage: Math.ceil(movies.length / count),
                movies: results
            })
        })
    }else{
        Movie
            .find({title: new RegExp(q + ".*", "gi")})
            .exec((err, movies) =>{
                if (err) {
                    console.log(err)
                }

                var results = movies.slice(index, index + count)

                // console.log(page+1)
                res.render('movie/result', {
                    title: '妹妹电影网-搜索列表页',
                    query: 'q=' + q,
                    keyword: q,
                    currentPage: page+1,
                    totalPage: Math.ceil(movies.length / count),
                    movies: results
                })
            })
    }
}