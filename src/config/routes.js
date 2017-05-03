var Index = require('../app/controllers/index')
var Movie = require('../app/controllers/movie')
var User  = require('../app/controllers/user')


module.exports = (app) => {

    //pre handle user
    app.use(function(req, res, next) {
        var _user = req.session.user
        app.locals.user = _user
        next()
    })
    

    // Index
    app.get('/', Index.index)

    // memeber
    app.get('/signup', User.showSignupPage)
    app.get('/signin', User.showSigninPage)
    app.get('/logout', User.logout)
    app.post('/user/signup', User.signup)
    app.post('/user/signin', User.signin)
    app.get('/admin/user', User.list)
    



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