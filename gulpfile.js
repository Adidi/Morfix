"use strict";
let gulp = require('gulp'),
  zip = require('gulp-zip'),
  uglify = require('gulp-uglify'),
  browserify = require('browserify'),
  babelify = require('babelify'),
  source = require('vinyl-source-stream'),
  gutil = require('gulp-util'),
  streamify = require('gulp-streamify'),
  watchify = require('watchify'),
  minifyCss = require('gulp-minify-css'),
  concat = require('gulp-concat'),
  del = require('del'),
  path = require('path'),
  merge = require('lodash/merge');

const conf = {
  jsSrc: 'src/js/index.jsx',
  jsName: 'app.js',
  jsDest: 'src/dist',
  cssSrc: 'src/css/*.css',
  cssName: 'app.css',
  cssDest: 'src/dist'
};

function getBundler(watch){
  let globalArgs = {extensions: ['.js', '.jsx','.json']},
    args = watch ? merge(watchify.args, { debug: true },globalArgs) : globalArgs,
    bundler = browserify(conf.jsSrc,args).transform(babelify, {presets: ['es2015', 'react']});
  if(watch){
    bundler = watchify(bundler);
  }
  return bundler;
}

function bundlejs(bundler,watch){
  bundler = bundler.bundle()
    .pipe(source(conf.jsName));

  if(!watch){
    bundler = bundler.pipe(streamify(uglify().on('error', gutil.log)));
  }

  return bundler.pipe(gulp.dest(conf.jsDest));
}

function cleanJs(){
  return del(path.join(conf.jsDest, conf.jsName));
}

gulp.task('clean-js',()=>{
  cleanJs();
});

gulp.task('js',['clean-js'],() => {
  return bundlejs(getBundler());
});

gulp.task('clean-css',()=>{
  return del(path.join(conf.cssDest, conf.cssName));
});

gulp.task('css',['clean-css'],() => {
  return gulp.src(conf.cssSrc)
    .pipe(concat(conf.cssName))
    .pipe(minifyCss())
    .pipe(gulp.dest(conf.cssDest));
});


gulp.task('watch',['js','css'],()=>{
  let bundler = getBundler(true);
  bundlejs(bundler,true);
  bundler.on('update', function () {
    cleanJs();
    bundlejs(bundler,true);
  });

  //watch css:
  gulp.watch(conf.cssSrc, ['css']);
});

gulp.task('zip', ['js','css'], ()=>{
  return gulp.src(['src/**/*.*','!src/js{,/**}','!src/css{,/**}'])
    .pipe(zip('morfix.zip'))
    .pipe(gulp.dest(''));
});
