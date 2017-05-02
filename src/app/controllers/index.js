

//index page
exports.index = (req, res) => {
    // Category
    //     .find({})
    //     .populate({
    //         path: 'movies',
    //         options: { limit: 8 }
    //     })
    //     .exec(function(err, categories){
    //         if (err) {
    //             console.log(err)
    //         }

            res.render('index', {

                // categories: categories,
                title: 'imovie 首页'

            })

        // })
}