/* jshint node: true */

(function() {
    'use strict';

    const gulp = require('gulp');

    // Styles
    const sass = require('gulp-sass');
    const sourcemaps = require('gulp-sourcemaps');
    const autoprefixer = require('gulp-autoprefixer');
    const cssnano = require('gulp-cssnano');

    // Scripts
    const concat = require('gulp-concat');
    const uglify = require('gulp-uglify');
    const jshint = require('gulp-jshint');
    const stylish = require('jshint-stylish');
    const templatecache = require('gulp-angular-templatecache');
    const ngAnnotate = require('gulp-ng-annotate');
    const Server = require('karma').Server;

    // Utilities
    const del = require('del');
    const notify = require('gulp-notify');
    const path = require('path');
    const plumber = require('gulp-plumber');
    const url = require('url');
    const proxy = require('proxy-middleware');
    const browserSync = require('browser-sync');
    const rename = require('gulp-rename');

    const lesNotifier = function(message) {
        return notify({
            title: 'commons-web',
            message: message,
            icon: path.join(__dirname, 'static/images/favicon-32x32.png')
        });
    };

    gulp.task('clean', function(cb) {
        return del(['dist', 'tmp'], cb);
    });

    gulp.task('copy-fonts', function() {
        return gulp
            .src(['static/fonts/**', 'libs/components-font-awesome/fonts/*', 'libs/bootstrap-sass/assets/fonts/**'])
            .pipe(gulp.dest('dist/fonts'));
    });

    gulp.task('copy-images', function() {
        return gulp.src(['static/images/**']).pipe(gulp.dest('dist/img'));
    });

    gulp.task('jshint', function() {
        var jshintNotifier = function(file) {
            if (!file.jshint) {
                return;
            }

            if (file.jshint.success) {
                return false;
            }

            var errors = file.jshint.results
                .map(function(data) {
                    if (data.error) {
                        return '(' + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
                    }
                })
                .join('\n');

            return file.relative + ' (' + file.jshint.results.length + ' errors)\n' + errors;
        };

        return gulp
            .src(['gulpfile.js', '!app/js/**/*.spec.js', 'app/js/**/*.js'])
            .pipe(jshint('.jshintrc', { fail: true }))
            .pipe(jshint.reporter(stylish))
            .pipe(lesNotifier(jshintNotifier));
    });

    gulp.task('template-cache', function() {
        return gulp
            .src(['!app/js/**/demo/**', 'app/js/**/*.html', 'app/templates/**/*.html'])
            .pipe(templatecache({ module: 'commons-web' }))
            .pipe(gulp.dest('tmp'));
    });

    gulp.task('minify-js', ['jshint', 'template-cache'], function() {
        return gulp
            .src(
                [
                    '!app/js/**/demo/**',
                    '!app/js/**/*.spec.js',
                    'app/js/**/*.module.js',
                    'app/js/**/*.config.js',
                    'app/js/**/*.run.js',
                    'app/js/**/*.js',
                    'tmp/templates.js'
                ],
                { base: 'app/js' }
            )
            .pipe(sourcemaps.init())
            .pipe(concat('commons-web.min.js'))
            .pipe(
                ngAnnotate().on('error', function(error) {
                    lesNotifier('Erro ao compilar o JS! \n' + error);
                })
            )
            .pipe(uglify())
            .pipe(lesNotifier('JS compilado com sucesso!'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('dist/js'));
    });

    gulp.task('minify-js-vendors', function() {
        return gulp
            .src([
                'bower_components/js-polyfills/polyfill.min.js',
                'bower_components/jquery/dist/jquery.min.js',
                'bower_components/angular/angular.min.js',
                'bower_components/moment/min/moment.min.js',
                'bower_components/moment-timezone/builds/moment-timezone-with-data.min.js',
                'bower_components/angular-cookies/angular-cookies.min.js',
                'bower_components/angular-sanitize/angular-sanitize.min.js',
                'bower_components/angular-messages/angular-messages.min.js',
                'bower_components/angular-animate/angular-animate.min.js',
                'bower_components/angular-moment/angular-moment.min.js',
                'bower_components/angular-local-storage/dist/angular-local-storage.min.js',
                'bower_components/angular-confirm-modal/angular-confirm.min.js',
                'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                'bower_components/angular-block-ui/dist/angular-block-ui.min.js',
                'bower_components/angular-auto-validate/dist/jcs-auto-validate.min.js',
                'bower_components/angular-dynamic-locale/dist/tmhDynamicLocale.min.js',
                'bower_components/angular-translate/angular-translate.min.js',
                'bower_components/angular-translate-loader-partial/angular-translate-loader-partial.min.js',
                'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js',
                'bower_components/angular-translate-storage-local/angular-translate-storage-local.min.js',
                'bower_components/angular-ui-router/release/angular-ui-router.min.js',
                'bower_components/angular-ui-switch/angular-ui-switch.min.js',
                'bower_components/angular-ui-sortable/sortable.min.js',
                'bower_components/fullcalendar/dist/fullcalendar.min.js',
                'bower_components/fullcalendar/dist/lang/pt-br.js',
                'bower_components/angular-ui-calendar/src/calendar.js',
                'bower_components/chosen/chosen.jquery.js',
                'bower_components/angular-chosen-localytics/dist/angular-chosen.min.js',
                'bower_components/angular-input-masks/angular-input-masks-standalone.js',
                'bower_components/angular-growl-v2/build/angular-growl.min.js',
                'bower_components/ng-table/dist/ng-table.min.js',
                'bower_components/angular-hotkeys/build/hotkeys.min.js',
                'bower_components/ng-tags-input/ng-tags-input.min.js',
                'bower_components/angular-permission/dist/angular-permission.js',
                'bower_components/angular-permission/dist/angular-permission-ui.js',
                'bower_components/angular-file-upload/dist/angular-file-upload.js'
            ])
            .pipe(concat('commons-web-vendors.min.js'))
            .pipe(
                ngAnnotate().on('error', function(error) {
                    lesNotifier('Erro ao compilar o JS! \n' + error);
                })
            )
            .pipe(uglify())
            .pipe(lesNotifier('Vendors JS compilado com sucesso!'))
            .pipe(gulp.dest('dist/js'));
    });

    gulp.task('minify-css-vendors', function() {
        return gulp
            .src([
                'bower_components/ng-tags-input/ng-tags-input.css',
                'bower_components/angular-block-ui/dist/angular-block-ui.min.css',
                'bower_components/chosen/chosen.css',
                'bower_components/ng-table/dist/ng-table.css',
                'bower_components/angular-growl-v2/build/angular-growl.min.css',
                'bower_components/angular-ui-switch/angular-ui-switch.css',
                'bower_components/fullcalendar/dist/fullcalendar.css'
            ])
            .pipe(concat('commons-web-vendors.min.css'))
            .pipe(cssnano({ discardComments: { removeAll: true }, zindex: false }))
            .pipe(lesNotifier('Vendors CSS compilado com sucesso!'))
            .pipe(gulp.dest('dist/css'));
    });

    gulp.task('sass', function() {
        return gulp
            .src('app/scss/commons-web.scss')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(cssnano({ discardComments: { removeAll: true }, zindex: false }))
            .pipe(lesNotifier('SASS compilado com sucesso!'))
            .pipe(sourcemaps.write('.'))
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest('dist/css'));
    });

    gulp.task('serve', function() {
        var projProp = {
            app: 'demo/',
            appName: 'les',
            basePath: '/les/demo/',
            port: 9006,
            apiPort: 8080,
            apiAddress: 'http://les.dev',
            apiProxyRoutes: ['/rest']
        };

        var baseUri = projProp.apiAddress + ':' + projProp.apiPort + '/' + projProp.appName + '/';
        var proxyRoutes = projProp.apiProxyRoutes;

        var proxies = [
            function(req, res, next) {
                proxyRoutes.forEach(function(route) {
                    if (url.parse(req.url).path === route) {
                        res.statusCode = 301;
                        res.setHeader('Location', route + '/');
                        res.end();
                    }
                });

                next();
            }
        ].concat(
            proxyRoutes.map(function(r) {
                var options = url.parse(baseUri + r);
                options.route = r;
                options.preserveHost = true;
                return proxy(options);
            })
        );

        var options = url.parse('http://localhost' + ':' + projProp.port);
        options.route = projProp.basePath;
        options.preserveHost = true;
        proxies.push(proxy(options));

        browserSync({
            open: true,
            port: projProp.port,
            startPath: projProp.basePath,
            server: {
                baseDir: projProp.app,
                middleware: proxies,
                routes: {
                    '/bower_components': 'bower_components',
                    '/app': 'app',
                    '/dist': 'dist'
                }
            }
        });
    });

    gulp.task('vendors', ['clean'], function() {
        gulp.start('minify-js-vendors');
        gulp.start('minify-css-vendors');
    });

    gulp.task('styles', ['clean'], function() {
        gulp.start('sass');
    });

    gulp.task('copy', ['clean'], function() {
        gulp.start('copy-fonts');
        gulp.start('copy-images');
    });

    gulp.task('scripts', ['clean'], function() {
        gulp.start('minify-js');
    });

    gulp.task('test', function(done) {
        new Server(
            {
                configFile: __dirname + '/karma.conf.js',
                singleRun: true
            },
            done
        ).start();
    });

    gulp.task('build', ['vendors', 'copy', 'scripts', 'styles']);

    gulp.task('demo', ['serve']);

    gulp.task('watch', ['build'], function() {
        gulp.watch('app/scss/**/*.scss', ['sass']);
        gulp.watch('static/images/**/*', ['copy-images']);
        gulp.watch(['app/js/**/*.js', 'app/js/**/*.html', 'app/templates/**/*.html'], ['minify-js']);
    });

    gulp.task('default', ['watch']);
})();
