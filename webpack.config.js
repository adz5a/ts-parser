"use strict";
const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");

module.exports = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loaders: [ "awesome-typescript-loader" ]
            },

            {
                loader: "source-map-loader",
                enforce: "pre",
                test: /\.js$/
            } 
        ] 
    },
    resolve: {
        extensions: [ ".tsx", ".ts", ".js" ] 
    },
    entry: {
        index: path.join( __dirname, "app/index.tsx" )
    },
    output: {
        filename: "[name].js",
        path: path.join( __dirname, "dist" )
    },
    plugins: [
        new HTMLPlugin({
            template: path.join( __dirname, "app/assets/index.html" ) 
        }) 
    ]
};
