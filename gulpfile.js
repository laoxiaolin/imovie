var gulp     = require('gulp');
var bs       = require('browser-sync').create();
var nodemon  = require('gulp-nodemon');


var pug      = require('gulp-pug');
var jshint   = require('gulp-jshint'); 
var del      = require('del');

var reload      = bs.reload;
 
// 管理路径
var src_dir = './src',
    dst_dir = './dist';
var paths = {
  html:   src_dir + '/**/*.{html,htm}',
  css:    src_dir + '/**/*.css',
  js:     src_dir + '/**/*.js',
  ts:     src_dir + '/**/*.ts',
  pug:    src_dir + '/**/*.pug',
  images: src_dir + '/img/**/*'
};

// 启动Borwser-sync
gulp.task('browsersync', ()=>{
  bs.init({
    ui: {
      port: 82
    },
    // 
    port: 81,
    // 
    server: {
      baseDir: [src_dir, dst_dir],
      directory: true,
      index: "index.html",
      routes: {
        "/node_modules": "node_modules",
        "/bower_components": "bower_components"
      }
    },
    // 
    // logLevel: "debug",
    //
    open: false
  
  })

  gulp.watch(paths.pug, ['pug-watch']);
  gulp.watch("./dist/**/*.{html,htm,css,js}").on('change', reload);
  
})

// 编译pug文件
gulp.task('pug', () => {
    var YOUR_LOCALS = {
        "message": "This app is powered by gulp.pug recipe for BrowserSync"
    };

    return gulp.src(paths.pug)
        .pipe(pug({
            locals: YOUR_LOCALS,
            pretty: true
        }))
        .pipe(gulp.dest(dst_dir));
})

// *单独的任务为`.pug`文件
gulp.task('pug-watch', ['pug'], reload);


// 删除Dist目录
gulp.task('clean', () => {
  del.sync(dst_dir)
});


//检验JS文件ES6
gulp.task('jslint', () => {  
  return gulp.src(paths.js)
    .pipe(jshint())
    // .pipe(jshint.reporter('default'))
});



//设置node监控
gulp.task('develop', () => {
  var stream = nodemon({ 
          script: src_dir + '/app.js',
          ext: 'js pug',
          ignore: [src_dir + '/public/js/*.js', 'gulpfile.js'],
          tasks: ['jslint'] })
 
  stream
      // .on('start', ['browsersync'], () => {
      //   console.log('Start browsersync!')
      // })
      .on('restart', () => {
        console.log('restarted!')
      })
      .on('crash', () => {
        console.error('Application has crashed!\n')
         stream.emit('restart', 10)  // restart the server in 10 seconds 
      })
})

gulp.task('default', ['clean', 'develop']);