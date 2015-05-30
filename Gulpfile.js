"use strict";
var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    streamify = require("gulp-streamify"),
    browserify = require("browserify"),
    minifycss = require('gulp-minify-css'),
    source = require("vinyl-source-stream"),
    server = require('gulp-develop-server'),
    notify = require("gulp-notify");

var paths = {

    models : "./src/models/*",
    controllers : "./src/controllers/*",
    srcJS : "./src/public/reactjs/boot.js",
    configs : "./src/configs/*",
    server : "./src/*",
    views : "./src/views/*",
    srcCSS : "./src/public/css/*.css",

    destJS : "./build/assets/js/",
    destCSS : "./build/assets/css/",
    destcontrollers : "./build/controllers/",
    destmodels : "./build/models",
    destconfigs : "./build/configs",
    destserver : "./build/",
    destviews : "./build/views",
    runserver : "./build/server.js"

};

gulp.task("bundle-client", function() {

    return browserify({
        entries:[ paths.srcJS ],
        debug : true,
        nobuiltins: "events querystring"
    })

    .on("error", function( err ){

        console.log(err);
        this.end();
        gulp.src("")
        .pipe( notify("✖ Bunlde Failed ✖") );

    })

    .transform( "reactify" )

    .bundle()
    .on("error", function( err ){

        console.log(err);
        this.end();
        gulp.src("")
        .pipe( notify("✖ Bunlde Failed ✖") );

    })

    .pipe( source("bundle.js") )

    .pipe(streamify(uglify()))

    .pipe( gulp.dest(paths.destJS))

});

gulp.task("controllers", function(){

    gulp.src(paths.controllers)

    .pipe(uglify())

    .pipe(gulp.dest(paths.destcontrollers));

});

gulp.task("Css", function(){

    gulp.src(paths.srcCSS)

    .pipe(minifycss({
        noAdvanced:false,
        keepBreaks:true,
        cache:true
    }))

    .pipe(gulp.dest(paths.destCSS));

});

gulp.task("models", function(){

    gulp.src(paths.models)

    .pipe(uglify())

    .pipe(gulp.dest(paths.destmodels));

});


gulp.task("views", function(){

    gulp.src(paths.views)

    .pipe(gulp.dest(paths.destviews));

});

gulp.task("initial", function(){

    gulp.src(paths.server)

    .pipe(uglify())

    .on("error", function( err ){

        console.log(err);
        this.end();
        gulp.src("")
        .pipe( notify("✖ Bunlde Failed ✖") );

    })

    .pipe(gulp.dest(paths.destserver));

});

gulp.task("configs", function(){

    gulp.src(paths.configs)

    .pipe(uglify())

    .pipe(gulp.dest(paths.destconfigs));

});

gulp.task( 'server:start', function() {

    server.listen(
        {

            path: paths.runserver,
            execArgv: ['--debug']

        }
    );

});


gulp.task( 'server:restart', function() {

    server.listen({

        env : {

            debug : 'keanux'
        },

        path : paths.runserver,

    });

    server.restart(function(err){

    if(err) console.log(err);

    else console.log(' Server restart on port 8080 ');

  });
});

gulp.task("watch", function(){

    gulp.watch("./src/configs/*",
        ["configs" , "server:restart"] );

    gulp.watch("./src/controllers/*",
        ["controllers", "server:restart"] );

    gulp.watch("./src/models/*",
        ["models", "server:restart"] );

    gulp.watch("./src/public/reactjs/**/*",
        ["bundle-client"]);

    gulp.watch("./src/views/*",
        ["views"]);

    gulp.watch("./src/*",
        ["initial", "server:restart"] );

});
gulp.task("dev", [

        "initial",
        "bundle-client",
        "configs",
        "models",
        "views",
        "controllers",
        "Css",

    ]);

gulp.task("default"
        , [
            "dev",
            "server:start",
            "watch"
        ]);
