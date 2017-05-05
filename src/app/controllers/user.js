var User = require('../models/user')



// user: show Signin page
exports.showSigninPage = (req, res) => {
    res.render('signin', {
        title: 'MM电影网-用户登陆'
    })
}

//user: show Signup page
exports.showSignupPage = (req, res) => {
    res.render('signup', {
        title: 'MM电影网-用户注册'
    })
}

//user: logout action
exports.logout = (req, res) => {
    delete req.session.user
    // delete app.locals.user

    res.redirect('/')
}

// user: signup action
exports.signup = (req, res) => {
    var _user = req.body.user

    User.findOne({'name': _user.name}, function(err, user) {        //判断用户名是否重复
        if (err) {
            console.log(err)
        }

        if (!user) {
            user = new User(_user)
            user.save(function(err, user) {
              if (err) { console.log(err) }
              User.update({'_id': user._id}, {'reg': {'regIp': req.ip, 'createAt': Date.now()}}, (err)=>{})
            })
            req.session.user = user
            // console.log(user)
            res.redirect('/')
        } else {
            console.log('user is have')
            res.redirect('/signin')
        }
    })
}



// user: signin action
exports.signin = (req, res) => {
    var _user = req.body.user
    var name = _user.name
    var password = _user.password
    var loginIp = req.ip
    console.log(loginIp)

    User.findOne({'name': name }, function(err, user) {
        if (err) { console.log(err) }

        if (!user) {
            return res.redirect('/singup')
        }

        user = new User(user)
        user.comparePassword(password, function(err, isMatch) {
            if (err) { console.log(err) }

            if (isMatch) {
                req.session.user = user
                User.where({'_id': user._id})
                    .update({
                        $set: {'login': {'lastIp': req.ip, 'lastTime': Date.now()}},
                        $inc: {'loginTotal': 1}
                    }) 
                    .exec((err) =>{})
                return res.redirect('/')
            } else {
                console.log('password is not compare')
                return res.redirect('/signin')
            }
        })
    })
}

//user list page
exports.list = (req, res) => {
    User
      .find({})
      .sort({_id : -1})
      .exec((err, users) => {
        if (err) {
            console.log(err)
        }
        res.render('admin/user/list', {
            title: 'imovie 用户列表',
            users: users
        })
    })
}


//  middleware
//To determine the user login
exports.signinRequired = function(req, res, next) {
    var user = req.session.user
    if (!user) {
        return res.redirect('/signin')
    }
    next()
}

//To determine the admin login
exports.adminRequired = function(req, res, next) {
    var user = req.session.user
    if (user.role <= 10) {
        return res.redirect('/signin')
    } 
    next()
}