const path = require('path');
module.exports =[
    {
        entry: './src/index.ts',
        mode: 'development',
        devtool: 'nosources-source-map',
        target: "node",
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                    include: [
                        path.resolve(__dirname, "src")
                    ],
                },
            ],
        },
        resolve: {
            extensions: [ '.tsx', '.ts', '.js' ],
        },
        output: {
            filename: 'chaxgame.bundle.js',
            path: path.resolve(__dirname, 'dist'),
            library: "Chax",
        },
    },
    {
        entry: './src/app.ts',
        mode: 'development',
        devtool: 'nosources-source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                    include: [
                        path.resolve(__dirname, "src")
                    ],
                },
            ],
        },
        resolve: {
            extensions: [ '.tsx', '.ts', '.js' ],
        },
        output: {
            filename: 'chaxgame.bundle.js',
            path: path.resolve(__dirname, 'docs/js'),
            library: "Chax",
        },
    }
];
