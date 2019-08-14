/*
  将stylus加载后处理成css，并将一些特殊的css属性(前缀)特殊处理
*/
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    autoprefixer()
  ]
}
