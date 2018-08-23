App({

  //promise封装post请求
  post:function(url,data){
    var promise=new Promise((resolve,reject)=>{
      var that=this
      var postData=data
      wx.request({
        url: url,
        data:postData,
        method:'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          resolve(res)
        },
        error: function (e) {
          reject('网络出错');
        }
      })   
    })
    return promise;
  },

  //用法
  //const app=getApp()  在需要用到request请求的页面中的顶部获取app.js中的App
  // app.post('https://server.artally.com.cn/zuzu/api/painting/paintinghot').then((res) => {
  //   console.log(res)
  // }).catch((error) => {
  //   console.log(error)
  // })


  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {

  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
