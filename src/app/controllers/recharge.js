 var Recharge = require('../models/recharge')
 var User = require('../models/user')

 var _ = require('underscore')


//admin: Recharge list page
exports.list = function(req, res) {
   Recharge.fetch(function(err, categories) {
       if (err) {
           console.log(err)
       }
       res.render('admin/movie/Rechargelist', {
           title: '后台分类列表',
           categories: categories
       })
   })
}


//add new Recharge page
exports.new = function(req, res) {
   res.render('user/recharge', {
       title: 'MM电影网-账号充值-确认充值',
       availableBalance: req.app.locals.user.availableBalance,
       orderStatus: 25
   })
}

//confirmRecharge page
exports.confirmRecharge = function(req, res) {
   res.render('user/recharge', {
       title: 'MM电影网-账号充值-确认订单',
       totalRecharge: req.body.totalRecharge,
       availableBalance: req.app.locals.user.availableBalance,
       orderStatus: 50
   })
}


//confirmOrder page
exports.confirmOrder = function(req, res) {
   res.render('user/recharge', {
       title: 'MM电影网-账号充值-进行支付',
       totalRecharge: req.body.totalRecharge,
       userId: req.app.locals.user._id,
       availableBalance: req.app.locals.user.availableBalance,
       orderStatus: 75
   })
}

//confirmOrder page
exports.save = function(req, res) {
   res.render('user/recharge', {
       title: 'MM电影网-账号充值-充值结果',
       totalRecharge: req.body.totalRecharge,
       userId: req.app.locals.user._id,
       availableBalance: req.app.locals.user.availableBalance,
       orderStatus: 75
   })
}


 //admin: Recharge update page
 exports.update = function(req, res) {
     var id = req.params.id
     if (id) {
         Recharge.findById(id, function(err, Recharge) {
             res.render('admin/movie/Recharge', {
                 title: 'imove 后台更新页',
                 Recharge: Recharge
             })
         })
     }
 }

//admin: post save Recharge action（addNew & update）
exports.save = function(req, res) {
   var _Recharge = req.body.Recharge
   var id = _Recharge._id
   var _cat
   if (id === undefined) {
       _cat = new Recharge(_Recharge)
       _cat.save(function(err, Recharge) {
           if (err) {console.log(err)}
           return res.redirect('/admin/Recharge/list')
       })
   }else{
      Recharge.findById(id, function(err, Recharge) {
           if (err) {
               console.log(err)
           }
           _cat = _.extend(Recharge, _Recharge)
           _cat.save(function(err, Recharge) {
               if (err) {console.log(err)}
               return res.redirect('/admin/Recharge/list')
           })             
       })
      
   }
}


 //admin: delete Recharge action
 exports.delete = function(req, res) {
     var id = req.query.id

     if (id) {
         Recharge.remove({ _id: id }, function(err, Recharge) {
             if (err) {
                 console.log(err)
             } else {
                 res.json({ success: 1 })
             }
         })

     }
 }