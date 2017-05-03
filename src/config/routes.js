var Index = require('../app/controllers/index')
var Movie = require('../app/controllers/movie')


module.exports = (app) => {

    // Index
    app.get('/', Index.index)



    // Front Movie
    app.get('/movie/:id', Movie.detail)
    // Admin Movie
    app.get('/admin/movie/list', Movie.list)
    app.get('/admin/movie/new', Movie.new)
    app.get('/admin/movie/update/:id', Movie.update)
    app.post('/admin/movie', Movie.save)
    app.delete('/admin/movie/list', Movie.delete)

    // app.post('/admin/movie', (req, res) => {
    //     console.log('body')
    //     console.log(req.body);
    //     res.send({ status: 'SUCCESS' });
    // })
}