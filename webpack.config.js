"use strict";
const path = require("path");

module.exports = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loaders: [ "awesome-typescript-loader" ]
            },
            {
                test: /\.js$/,
                loaders: [
                    {
                        loader: "source-map-loader",
                        enforce: "pre"
                    } 
                ]
            }
        ] 
    },
    resolve: {
        extensions: [ ".tsx", ".ts", ".js" ] 
    },
    entry: {
        index: "app/index.tsx" 
    },
    output: {
        filename: "[name].js",
        path: "./dist"
    }
};
