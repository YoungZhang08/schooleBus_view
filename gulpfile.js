var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	less = require('gulp-less'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	cssmin = require('gulp-minify-css'),
    browserSync = require('browser-sync').create();

//语法检查
gulp.task('lint', function() {
    return gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default')) //对代码进行报错提示
        .pipe(concat('main.js')) //合并所有js到main.js
        .pipe(rename({
            suffix: '.min' //rename压缩后的文件名
        }))
        .pipe(uglify()) //压缩
        .pipe(gulp.dest('lastpack/js')); // 输出
});

//编译less，读取输出到新文件夹中
gulp.task('less', function() {
    return gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('src/css')); //输出文件夹
});

gulp.task('scripts',function(){
    return gulp.src('src/css/*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('lastpack/css'))
        .pipe(rename('main.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('lastpack/css'));
});

//监听文件并自动刷新
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });

    gulp.watch(['src/js/*.js', 'src/less/*.less', 'src/html/*.html'], function() {
        gulp.run('lint', 'less', 'scripts');
        console.log('ok');
        browserSync.reload();
    });
});


//默认行为
gulp.task('default', function() {
    gulp.run('server');
});