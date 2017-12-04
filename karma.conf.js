module.exports = function(config) {
    config.set({
        basePath: '',
        browsers: ['PhantomJS'],
        files: [
           // { pattern: 'test-context.js', watched: true }
        
           // all files ending in "_test"
            'site/**/*-spec.js'
            
        ],
        frameworks: ['jasmine'],
        preprocessors: {
           // 'test-context.js': ['webpack']
          
            // add webpack as preprocessor
            'site/**/*-spec.js': ['webpack'],
           
        },
        webpack: {
            module: {
                loaders: [
                    { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader' }
                ]
            },
            watch: true
        },
        webpackServer: {
            noInfo: true
        }
    });
}
