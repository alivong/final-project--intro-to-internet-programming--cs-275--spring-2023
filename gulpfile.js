const {src, dest, watch, series} = require(`gulp`),
    CSSLinter = require(`gulp-stylelint`),
    jsLinter = require(`gulp-eslint`),
    babel = require(`gulp-babel`),
    htmlCompressor = require(`gulp-htmlmin`),
    htmlValidator = require(`gulp-html`),
    cssCompressor = require(`gulp-clean-css`),
    jsCompressor = require(`gulp-uglify`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

let validateHTML = () => {
    return src(`dev/html/index.html`)
        .pipe(htmlValidator(undefined));
};

let lintCSS = () => {
    return src(`dev/css/style.css`)
        .pipe(CSSLinter({
            failAfterError: false,
            reporters: [
                {formatter: `string`, console: true}
            ]
        }));
};

let lintJS = () => {
    return src(`dev/js/*.js`, `gulpfile.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

let transpileJS = () => {
    return src(`dev/js/*.js`)
        .pipe(babel())
        .pipe(dest(`temp/scripts`));
};

let compressHTML = () => {
    return src(`dev/html/index.html`)
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let compressCSS = () => {
    return src(`dev/css/style.css`)
        .pipe(cssCompressor())
        .pipe(dest(`prod/css`));
};

let compressJS = () => {
    return src(`dev/js/app.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};

let serve = () => {
    browserSync({
        notify: true,
        server: {
            baseDir: [
                `temp`,
                `dev`,
                `dev/html`
            ]
        }
    });

    watch(`dev/css/*.css`)
        .on(`change`, reload, lintCSS);

    watch(`dev/js/*.js`)
        .on(`change`, series(reload, lintJS, transpileJS));
};

let copyUnprocessedAssetsForProd = () => {
    return src([
        `dev/*.*`,              // Source all files,
        `dev/**`,               // and all folders,
        `!dev/html/`,           // but not the HTML folder
        `!dev/html/*.*`,        // or any files in it
        `!dev/html/**`,         // or any sub folders;
        `!dev/**/*.js`,         // ignore JS;
        `!dev/css/style.css`    // and, ignore Sass/CSS.
    ], {dot: true})
        .pipe(dest(`prod`));
};

exports.validateHTML = validateHTML;
exports.lintCSS = lintCSS;
exports.lintJS = lintJS;
exports.transpileJS = transpileJS;
exports.compressHTML = compressHTML;
exports.compressCSS = compressCSS;
exports.compressJS = compressJS;
exports.serve = serve;
exports.copyUnprocessedAssetsForProd = copyUnprocessedAssetsForProd;
exports.default = series (
    validateHTML,
    lintCSS,
    lintJS,
    transpileJS,
    serve
);
exports.build = series (
    compressHTML,
    compressCSS,
    compressJS,
    copyUnprocessedAssetsForProd
);

