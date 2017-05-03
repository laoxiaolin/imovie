var Index = require('../app/controllers/index')
var Movie = require('../app/controllers/movie')
var User  = require('../app/controllers/user')
var Category  = require('../app/controllers/category')


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
    app.get('/admin/user', User.signinRequired, User.adminRequired ,User.list)


    // ==== category ====
    // front category
    

    // admin category
    app.get('/admin/category/list', User.signinRequired, User.adminRequired, Category.list)
    app.get('/admin/category/new', User.signinRequired, User.adminRequired, Category.new)
    app.get('/admin/category/update/:id', User.signinRequired, User.adminRequired, Category.update)
    app.post('/admin/category', User.signinRequired, User.adminRequired, Category.save)
    app.delete('/admin/category/list', User.signinRequired, User.adminRequired, Category.delete)
    

    // ==== movie ====
    // Front Movie
    app.get('/movie/result', Index.search)
    app.get('/movie/:id', Movie.detail)
    // Admin Movie
    app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list)
    app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new)
    app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update)
    app.post('/admin/movie', User.signinRequired, User.adminRequired, Movie.save)
    app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.delete)

}