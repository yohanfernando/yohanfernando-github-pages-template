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
var notify = require('gulp-notify');
var rename = require('gulp-rename');

/**
 * Copy bower based libraries to appropriate folders.
 *
 * Note: amend as more library get added on.
 */
gulp.task('copy-libraries', function () {
    gulp.src(['./_bower_components/foundation/scss/foundation/**'])
        .pipe(gulp.dest('_scss/foundation'));
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
 * Call jekyll-build to rebuild the site and reload the pages via browser-sync.
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
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
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('_site/assets/css/'))
        .pipe(browserSync.reload({stream: true}))
        .pipe(notify({
            message: "SCSS files compiled & injected to '_site/assets/css/' folder."
        }));
});

/**
 * Watch scss files for changes, recompile and save & inject
 * Watch html/md files, run jekyll & reload browser-sync
 */
gulp.task('watch', ['jekyll-build'], function () {

    gulp.watch('_scss/**/*.scss', ['scss']);
    gulp.watch(['index.html', '_config.yml', '_includes/*', 'layouts/*', '_posts/*'], ['jekyll-rebuild']);
});

/**
 * Create a static server to use whilst development, served from _site (jekyll's default compile location).
 *
 * This will watch files for any changes as well.
 */
gulp.task('serve', ['watch'], function () {

    browserSync.init({
        server: "_site"
    });

});

/**
 * Helper command to build jekyll site
 */
gulp.task('build', ['jekyll-build']);

gulp.task('default', ['serve']);
