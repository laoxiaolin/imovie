 // var Movie = require('../models/movie')
 var Category = require('../models/category')
 var _ = require('underscore')


//admin: category list page
exports.list = function(req, res) {
   Category.fetch(function(err, categories) {
       if (err) {
           console.log(err)
       }
       res.render('admin/movie/categorylist', {
           title: '后台分类列表',
           categories: categories
       })
   })
}


//admin: add new category page
exports.new = function(req, res) {
   res.render('admin/movie/category', {
       title: '后台分类录入',
       category: {}
   })
}


 //admin: category update page
 exports.update = function(req, res) {
     var id = req.params.id
     if (id) {
         Category.findById(id, function(err, category) {
             res.render('admin/movie/category', {
                 title: 'imove 后台更新页',
                 category: category
             })
         })
     }
 }

//admin: post save category action（addNew & update）
exports.save = function(req, res) {
   var _category = req.body.category
   var id = _category._id
   var _cat
   if (id === undefined) {
       _cat = new Category(_category)
       _cat.save(function(err, category) {
           if (err) {console.log(err)}
           return res.redirect('/admin/category/list')
       })
   }else{
      Category.findById(id, function(err, category) {
           if (err) {
               console.log(err)
           }
           _cat = _.extend(category, _category)
           _cat.save(function(err, category) {
               if (err) {console.log(err)}
               return res.redirect('/admin/category/list')
           })             
       })
      
   }
}


 //admin: delete category action
 exports.delete = function(req, res) {
     var id = req.query.id

     if (id) {
         Category.remove({ _id: id }, function(err, category) {
             if (err) {
                 console.log(err)
             } else {
                 res.json({ success: 1 })
             }
         })

     }
 }