// const url='http://api.zhuishushenqi.com/cats/lv2/statistics'
//http://novel.juhe.im/search?keyword=遮天
// const proxy = require('http-proxy-middleware');
module.exports = {

    // devServer:{
    //   host: 'localhost',//target host
    // port: 8080,
    //   proxy:{
    //     '/api':{
    //       target:'http://www.mangaeden.com',
    //       pathRewrite:{"^/api" : "/api"},
    //       changeOrigin:true, 
    //     },
    //   }
    // },
  devServer: {
      disableHostCheck: true,
  },
  publicPath: '/manga',
  "transpileDependencies": [
    "vuetify"
  ]
}


