/**
 * Gulp file to listen, build and serve during development of the blog/site.
 *
 * This will initially build the site using jekyll commands (via a child process).
 * During the development stages this will compile scss, html & javascript,
 * inject to jekyll's output ('_site') folder and call browser-sync to reload the page.
 *
 * This enable quicker development time rather than compiling the Jekyll site each time.
 *
 * Inspiration for this is from @shakyShane's 'jekyll-gulp-sass-browser-sync' git
 * repo (https://github.com/shakyShane/jekyll-gulp-sass-browser-sync/).
 *
 * Also Jake Chapman's 'Quick intro to Gulp.js' is a
 * good read (https://www.codefellows.org/blog/quick-intro-to-gulp-js).
 */

var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var cp = require('child_process');
var open = require('gulp-open');
var wait = require('gulp-wait');
var rename = require('gulp-rename');
var del = require('del');

/**
 * Copy bower based libraries to appropriate folders.
 *
 * Note: amend as more library get added on.
 */
gulp.task('copy-libraries', function () {
    gulp.src(['./_bower_components/foundation/scss/foundation/**'])
        .pipe(gulp.dest('_scss/foundation'));

    gulp.src(['./_bower_components/font-awesome/scss/**'])
        .pipe(gulp.dest('_scss/font-awesome'));

    gulp.src(['./_bower_components/font-awesome/fonts/**'])
        .pipe(gulp.dest('assets/fonts'));

    //Delete the css file used as development time auto-complete as it conflicts
    del(['./assets/css/style.css']);

});

/**
 * This will copy static dev files to _site folder - only use in development and via `gulp develop`
 */
gulp.task('copy-static-dev-files', function () {
    return gulp.src(['_dev_static_files/dev-home.html', '_dev_static_files/dev-single-post.html'])
        .pipe(gulp.dest('./_site/'));
});


/**
 * Build the Jekyll Site using 'jekyll build' command
 */
gulp.task('jekyll-build', ['copy-libraries'], function (done) {

    browserSync.notify('<span style="color: grey">Running:</span> $ jekyll build');

    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Build & serve the site using 'jekyll serve' command
 * Also opens up the site in http://localhost:4000 after 10 seconds (hopefully once build complete)
 */
gulp.task('jekyll-serve', ['copy-libraries'], function (done) {

    cp.spawn('jekyll', ['serve'], {stdio: 'inherit'})
        .on('close', done);

    /*
        This will wait for 10 seconds before opening the web browser to give ample
        time to complete Jekyll build
     */
    gulp.src('')
        .pipe(wait(10000))
        .pipe(open({uri: 'http://localhost:4000'}));
});

/**
 * Call jekyll-build to rebuild the site and reload the pages via browser-sync.
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {

    //copy static dev files once jekyll build is completed
    gulp.run("copy-static-dev-files");

    browserSync.reload();
});

/**
 * Compile scss files from _scss and save to _site/assets/css folder.
 *
 * These will be auto injected into browsers.
 */
gulp.task('scss', function () {
    return gulp.src('_scss/main.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify,
            errLogToConsole: true
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('_site/assets/css/'))
        .pipe(gulp.dest('assets/css/'));//added to assist in development auto complete
});


/**
 * Watch scss files for changes, recompile and save & inject
 * Watch html/md files, run jekyll & reload browser-sync
 */
gulp.task('watch', ['jekyll-build'], function () {

    //copy static dev files once jekyll build is completed
    gulp.run("copy-static-dev-files");

    //initiate gulp watch for browser-sync
    gulp.watch(['_scss/**/*.scss'], ['scss']).on('change', browserSync.reload);
    gulp.watch(['_dev_static_files/**'], ['copy-dev-files']).on('change', browserSync.reload);
    gulp.watch(['index.html', '_config.yml', 'blog/**', '_includes/**', '_layouts/**', '**.md'],
        ['jekyll-rebuild']).on('change', browserSync.reload);
});

/**
 * Create a static server to use whilst development, served from _site (jekyll's default compile location).
 *
 * This will watch files for any changes as well.
 */
gulp.task('develop', ['watch'], function () {

    browserSync.init({
        injectChanges: true,
        server: "_site"
    });

});

/**
 * Execute `jekyll serve` which can be used when writing articles & editing the jekyll site. This
 * will use default jekyll watch and insert edited files to the `_site` folder structure, however
 * wont refresh the page.
 *
 * If using the static files to develop its best to use `gulp develop`
 */
gulp.task('serve', ['jekyll-serve']);

/**
 * Helper command to build jekyll site
 */
gulp.task('build', ['jekyll-build']);

gulp.task('default', ['serve']);
