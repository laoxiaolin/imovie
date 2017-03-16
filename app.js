var express = require('express')
var path = require('path')
var mongoose = require('mangoose')
var _ = require('underscore')
var Movie = require('./models/movie')
var port = process.env.PORT || 8080
var app = express()

mongoose.connect('moogodb://localhost/imovie')

app.set('views', './views/pages')
app.set('view engine', 'jade')
    //app.use(express.bodyParser())
app.use(express.static(path.join(__dirname, 'public')))
app.listen(port)



console.log('imove is start on port： ' + port)


//index list page
app.get('/', function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err)
        }

        res.render('index', {
            title: 'imovie 首页',
            movies: movies

        })
    })


})


//detail page
app.get('/detail/:id', function(req, res) {

	var id = req.params.id

	Movie.findById(id, function(err,movie){
		res.render('detail', {
	        title: movie.title + '详情',
	        movie: movie

	    })
	})

})


//admin page
app.get('/admin/movie', function(req, res) {
    res.render('admin', {
        title: 'imovie 后台录入',
        movie: {
            doctor: '',
            country: '',
            title: '',
            year: '',
            poster: '',
            language: '',
            flash: '',
            summary: ''
        }

    })
})


//admin update movie
app.get('/admin/update/:id', function(req, res){
	var id = req.params.id

	if (id) {
		Movie.findById(id, function(err, movie){
			res.render('admin', {
				title: 'imove 后台更新页',
				movie: moive 
			})
		}
	}


})

//admin post moive
app.post('/admin/movie/new', function(req, res){
	var id = req.body.movie._id
	var movieObj = req.body.movie
	var _movie

	if (id !== 'underfined') {
		Movie.findById(id, function(err, movie){
			if (err) {
				console.log(err)
			}

			_movie = _.extend(movie, movieObj)
			_movie.save(function(err, movie){
				if (err) {
					console.log(err)
				}

				res.redirect('/movie/' + movie._id)
			})
		})

	}
	else{
		_movie = new Movie({
			doctor: movieObj.doctor
			title: movieObj.title
			country: movieObj.country
			language: movieObj.language
			year: movieObj.year
			poster: movieObj.poster
			summary: movieObj.summary
			flash: movieObj.flash
		})

		_movie.save(function(err, movie){
			if (err) {
				console.log(err)
			})

			res.redirect('/movie/' + movie._id)
		}
	}
})

//admin list delete movie
app.delete('/admin/list', function(req, res){
	var id = req.query.id

	if (id) {
		Movie.remove({_id: id}, function(err,movie){
			if (err) {
				console.log(err)
			}
			else{
				res.json({success: 1})
			}
		})

	}

})



//admin list page
app.get('/admin/list', function(req, res) {
	Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err)
        }

	    res.render('list', {
	        title: 'imovie 后台列表',
	        movies: movies
	        // movies: [{
	        //     doctor: '何塞',
	        //     _id: 1,
	        //     country: '中国',
	        //     title: '测试电影1',
	        //     year: 2014,
	        //     language: '英语'
	        // }]
	    })
	}
})


//user
//user registe page
app.get('/user/registe', function(req, res) {
    res.render('registe', {
        title: 'imovie 用户注册'

    })
})


//user reg page
app.get('/user/login', function(req, res) {
    res.render('login', {
        title: 'imovie 用户登陆'

    })
})


//user reg page
app.get('/user/pay', function(req, res) {
    res.render('pay', {
        title: 'imovie 用户支付'

    })
})
