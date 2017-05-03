var express    = require('express')
var mongoose   = require('mongoose')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session      = require('express-session')
var mongoStore   = require('connect-mongo')(session)



var app     = express()


//连接数据库
var dbUrl   = 'mongodb://localhost:81/imovie'
// mongoose.Promise = global.Promise
mongoose.connect(dbUrl)


// 管理路径
var src_dir = './src',
    dst_dir = './dist';
var port    = process.env.PORT || 85

// 基本设置
app.set('views', src_dir + '/app/views/pages')
app.set('view engine', 'pug')
app.locals.moment = require('moment')       //未理解什么意思


//装载中间件
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
    secret: 'imovie',
    store: new mongoStore({
        url: dbUrl,
        touchAfter: 24 * 3600,
        collection: 'sessions'
    })
}))
app.use(express.static(__dirname + '/public'))      //指定根路径
// app.use('/bower_components',  express.static(path.join(path.resolve('./'), '/bower_components')))
// console.log(bodyParser.json())

//装载路由文件
require('./config/routes')(app)           //此处有很多写法，注意学习

// 调试程序
if(app.get('env') === 'development'){
  app.set('showStackError', true)       //未理解什么意思
  // app.use(logger(':method :url :status'))
  app.locals.pretty = true             //未理解什么意思
  // mongoose.set('debug', true)       //mongoose操作的内容
}


//启动监听
app.listen(port, () => {
  console.log('Express server listening on port ' + port);
})