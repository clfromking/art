const Rpx = 750 / wx.getSystemInfoSync().windowWidth
App({
  data:{
    url :'https://server.artally.com.cn/',
    formIds:[],
  },

  // 显示隐藏home-icon
  showHome:function(th){
    let historys = [], pages = getCurrentPages();
    for (let i = 0; i < pages.length; i++) {
      historys.push(pages[i].route)
    }
    // console.log(historys)
    if (historys.length == 1) {
      th.setData({
        hidehome: false
      })
    }
  },
  //添加formid
  addFormid:function(){
    var that=this
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        // console.log(res.data.openid)
        that.post('template/get_forms_id', { 'openid': res.data.openid, 'form_ids': that.data.formIds.join(',')}).then((res) => {
          console.log(res)
          if(res.code==200){
            that.data.formIds=[]
          }
        })
      },
    })
    
  },

  //收集formid
  getFormid:function(e){
    if (e.detail.formId =='the formId is a mock one') return
    var timestamp = Date.parse(new Date()) / 1000;
    var pushData = e.detail.formId + '-' + timestamp
    this.data.formIds.push(pushData)
    console.log(this.data.formIds)
  },

  //promise封装post请求
  post: function (url, data, params){
    // console.log(this.globalData.url)
    var promise=new Promise((resolve,reject)=>{
      var that=this
      var postData=data
      var _url = params == 1 ? 'users/api/' : 'gift/api/' 
      wx.request({
        url: that.globalData.url + _url+url,
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

  //判断是否登录
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
  
  //通用分享
  commonShare:function(res){
    return {
      title:'神马送礼小程序，玩转微信新潮流。',
      path:'pages/index/index',
      imageUrl:'https://pic.forunart.com/artgive/wx/zong_banner@3x.png'
    }
  },

  bannerGo:function(e){
    switch (Number(e.currentTarget.dataset.go)) {
      case 1:
        break;
      case 2:
        wx.switchTab({
          url: '../index/index',
        })
        break;
      case 3:
        wx.navigateTo({
          url: '../hintDetail/hintDetail?id=' + e.currentTarget.dataset.go_id,
        })
        break;
      case 4:
        wx.navigateTo({
          url: '../raffle/raffle?id=' + e.currentTarget.dataset.go_id,
        })
        break;
      case 5:
        wx.navigateTo({
          url: '../subject/subject?id=' + e.currentTarget.dataset.go_id,
        })
        break;
      case 6:
        wx.navigateTo({
          url: '../mall/mall',
        })
        break;
    }
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
    wx.request({
      url: 'https://server.artally.com.cn/gift/api/template/get_gift_url',
      method:'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success:function(res){
        console.log(res)
        that.globalData.url=res.data.data.url
        console.log(that.globalData.url)
      }

    })
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
    wx.removeStorageSync('waitOperateGifts')
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
    barHeight:'',
    url:''
  }
})
