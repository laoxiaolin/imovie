var Category = require('../models/category')
var Movie    = require('../models/movie')
var _        = require('underscore')

 //front: movie detail page
exports.detail = (req, res) => {
   var id = req.params.id

   Movie
      .findOne({'_id': id})
      .populate('category')
      .exec(function(err, movie) {
           // Comment
           //   .find({ 'movie': id })
           //   .populate('from', 'name')
           //   .populate('reply.from reply.to', 'name')
           //   .exec(function(err, comments) {
                 res.render('movie/detail', {
                     title: 'MM电影网 - ' + movie.title + ' - 详情',
                     movie: movie
                     // comments: comments
                 })
             // })
      })
}


//admin:list movie page
exports.list = (req, res) => {
   Movie
    .find({})
    .populate({
      path: 'category',
      select: 'name',
      options: { limit: 18 }
    })
    .exec(function(err, movies) {
       if (err) {
           console.log(err)
       }

       res.render('admin/movie/list', {
           title: '后台管理-电影信息管理',
           movies: movies
       })
   })
}


//admin:add new movie page
exports.new = (req, res) => {
   Category.fetch(function(err, categories) {
       res.render('admin/movie/movie', {
           title: '后台管理-电影信息录入',
           categories: categories,
           movie: {}
       })
   })
}


//admin:update movie page
exports.update = (req, res) => {
   var id = req.params.id

   if (id) {
       Movie.findById(id, function(err, movie) {
           Category.fetch(function(err, categories) {
               res.render('admin/movie/movie', {
                   title: '后台管理-电影信息修改',
                   movie: movie,
                   categories: categories
               })
           })
       })
   }
}

//admin：post save movie（addNew & update）
exports.save = (req, res) => {
   var _movie = req.body.movie
   var id = _movie._id
   var __movie

   if (req.poster){
      _movie.poster = req.poster
   }

   if (id === undefined) {          // add new
       __movie = new Movie(_movie)
       var categoryId = _movie.category

       __movie.save(function(err, movie) {
           if (err) {
               console.log(err)
           }

           Category.findById(categoryId, function(err, category) {
               category.movies.push(movie._id)
               category.save(function(err, category) {
                   if (err) {
                       console.log(err)
                   }

                   // alert('添加成功！')
                   res.redirect('/admin/movie/list')
               })
           })
       })
   } else {                         // update
       Movie.findById(id, function(err, movie) {
           if (err) {
               console.log(err)
           }

           __movie = _.extend(movie, _movie)
           __movie.save((err, movie) => {
               if (err) {
                   console.log(err)
               }               

               // alert('修改成功！')
               res.redirect('/admin/movie/list')
           })
       })
   }
}

//admin:delete movie action
exports.delete = (req, res) => {
   var id = req.query.id
   if (id) {
       Movie.remove({ _id: id }, function(err, movie) {
           if (err) {
               console.log(err)
           } else {
               res.json({ success: 1 })
           }
       })
   }
}

//admin:delete movie action
exports.savePoster = (req, res, next) => {
   console.log(req.file)
   if(req.file){
     req.poster = (req.file.destination + '/' + req.file.filename).replace('./src/public','')
   }
   next()
}