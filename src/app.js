var express = require('express')
var path = require('path')



var app     = express()
require('./config/routes')(app)


// 管理路径
var src_dir = './src',
    dst_dir = './dist';
var port    = process.env.PORT || 83

// 基本设置
app.set('views', src_dir + '/app/views/pages')
app.set('view engine', 'pug')


//装载中间件和指定路径
app.use(express.static(path.join(__dirname, src_dir + 'public')))
app.use('/bower_components',  express.static(path.join(path.resolve('./'), '/bower_components')));
// console.log(path.join(path.resolve('./'), '/bower_components'))

//启动监听
app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});