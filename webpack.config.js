var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

var packCss = new ExtractTextPlugin('./css/[hash:8].[name].min.css');
var packCs = new ExtractTextPlugin('./css/cs/[hash:8].[name].min.css');

module.exports = {
  //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
  entry: APP_PATH,
  //输出的文件名 合并以后的js会命名为bundle.js
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  module:{
    loaders:[
        {
            test:/\.(png|jpg|gif)$/,
            use:[
                    {
                        loader:'url-loader?limit=8192&name=img/[hash:8].[name].[ext]'
                    }
            ]
        },
        {
            test:/\.js$/,
            exclude:/node_modules/,
            use:{
                loader: 'babel-loader',
                options:{
                    presets:['env']
                }
            }
        },
        {
            test:/\.css$/,
            use:ExtractTextPlugin.extract({
                fallback:'style-loader',
                use: 'css-loader?minimize',
                publicPath:'../'
             
            })
        }
    ]
  },
  //添加我们的插件 会自动生成一个html文件
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Hello World',
      template:'./app/index.html',
      inject:'body'
    }),
    new webpack.HotModuleReplacementPlugin(),
    packCss,
    //多层文件内的css文件
    packCs
  ]
//   ,
//   devServer:{
//       contentBase:path.join(__dirname,'build'),
//       compress: true,
//       port: 8080,
//       hot: true,
//       disableHostCheck:true
//   }
};