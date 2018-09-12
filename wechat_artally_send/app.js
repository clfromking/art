const Rpx = 750 / wx.getSystemInfoSync().windowWidth
App({
  data:{
    url :'https://server.artally.com.cn/',
    formIds:[],
  },

  addFormid:function(){
    var that=this
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        // console.log(res.data.openid)
        that.post('template/get_forms_id', { 'openid': res.data.openid, 'form_ids': that.data.formIds.join(',')}).then((res) => {
          console.log(res)
        })
      },
    })
    
  },


  getFormid:function(e){
    var timestamp = Date.parse(new Date()) / 1000;
    var pushData = e.detail.formId + '-' + timestamp
    this.data.formIds.push(pushData)
    console.log(this.data.formIds)
  },

  //promise封装post请求
  post: function (url, data, params){
    var promise=new Promise((resolve,reject)=>{
      var that=this
      var postData=data
      var _url = params == 1 ? 'users/api/' : 'gift/api/' 
      wx.request({
        url: that.data.url + _url+url,
        data:postData,
        method:'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          resolve(res.data)
        },
        error: function (e) {
          reject('网络出错');
        }
      })   
    })
    return promise;
  },

  islogin:function(){
    var promise=new Promise((resolve,reject)=>{
      wx.getStorage({
        key: 'userInfo',
        success: function(res) {
          resolve(res)
        },
        fail:function(){
          wx.navigateTo({
            url: '../author/author',
          })
        }
      })
    })
    return promise
  },
  
  //用法
  //const app=getApp()  在需要用到request请求的页面中的顶部获取app.js中的App
  // app.post('https://server.artally.com.cn/zuzu/api/painting/paintinghot').then((res) => {
  //   console.log(res)
    
  // }).catch((error) => {
  //   console.log(error)
  // })

  // app.post().then((res) => {
  //   console.log(res)
  //   if (res.data.code == 200) {

  //   }
  // }).catch((error) => {
  //   console.log(error)
  // })

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () { 
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.barHeight = (47 + res.statusBarHeight) * Number(Rpx) + 'rpx'
      },
    })    
    // wx.clearStorage()
    wx.removeStorage({
      key: 'gifts',
      success: function(res) {},
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    // wx.clearStorage()
    // wx.removeStorage({
    //   key: 'gifts',
    //   success: function (res) { },
    // })
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
    
  },
  globalData:{
    barHeight:''
  }
})
