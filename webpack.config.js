const path = require('path')
// 导入在内存中生成HTML页面的插件
// 只要是插件，都一定要放到plugins节点中
// 这个节点的所用：
// 1. 自动在内存中根据指定页面生成一个内存的页面
// 2. 自动把打包好的bundle.js追加到页面中
const htmlWebpackPlugins = require('html-webpack-plugin')

// 因为Vue-loader在15.之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 这个配置文件，其实就是通过一个JS文件，通过Node中的模块操作，向外暴露了一个配置对象
module.exports = {

  // 需要在配置文件中手动指定入口和出口
  entry: './src/main.js', // 入口，要打包的文件
  output: { // 输出文件相关配置
      path: path.resolve(__dirname, 'dist'), // 指定打包好的文件要输出到哪个路径
    filename: 'bundle.js' // 指定输出文件名
  },
  mode:'development',
  plugins: [ // 配置插件的节点
    new htmlWebpackPlugins({ // 创建一个在内存中生成HTML页面的插件
      template: path.join(__dirname, './src/index.html'), // 指定 模板页面，将来会根据指定的页面路径，去生成内存中的页面
      filename: 'index.html' // 指定生成的页面名称
    }),
    new VueLoaderPlugin(),
  ],
  module: { // 配置所有第三方模块加载器
    rules: [ // 所有第三方模块的匹配规则
      {test: /\.css$/, use: ['style-loader', 'css-loader']}, // 配置处理 .css 文件的第三方loader规则
      {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']}, // 这是配置处理.less文件的第三方规则
      {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']}, // 配置处理.sass文件的第三方规则
      {test: /\.vue$/, use: 'vue-loader'}, // 处理 .vue文件
      {test:/\.(ttf|eot|svg|woff|woff2|otf)$/, use: 'url-loader'} // 处理字体文件
    ]
  },
  resolve: {
    alias: { // 修改vue被导入时的包的路径
      // 'vue$': 'vue/dist/vue.js'
    }
  }
};