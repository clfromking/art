const Rpx = 750 / wx.getSystemInfoSync().windowWidth
// 01059756813
App({
  data:{
    url:'https://api.buybuyart.com/',
    // url: 'https://server.artally.com.cn/',
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
        url: that.data.url + _url+url,
        data:postData,
        method:'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          resolve(res.data)
        },
        fail: function (res) {
          reject(res);
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


  LaunchSetIntegral:function(){
    var that=this
    const UserInfo = wx.getStorageSync('userInfo')
    console.log(UserInfo.uid)
    if (UserInfo.uid) {
      var a=new Promise(function (resolve, reject){
        wx.request({
          url: that.data.url + "gift/api/grade/cat",
          data: { "uid": UserInfo.uid },
          method: 'POST',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (res) {
            console.log(res)
            if(res.data.code==600){
              that.globalData.ishideIntegral = false
              var data={"status":false,"num":0}
              resolve(data)
            }
            else{
              that.globalData.ishideIntegral = true
              that.globalData.integralNum=res.data.data
              var data = { "status": true, "num": res.data.data }
              resolve(data)
            }
            // resolve(res.data)
          },
          fail: function (res) {
            reject(res);
          }
        })
      })
      return a
    }
    else {
      
      var a = new Promise(function (resolve, reject){
        that.globalData.ishideIntegral = false
        var data = { "status": false, "num": 0 }
        resolve(data)
      })
      return a
    }
  },

  setLimit:function(){
    var that=this
    that.post('grade/sub_rule').then((res)=>{
      // console.log(res)
      if(res.code==200){
        that.globalData.score=res.data.score
        that.globalData.money=res.data.money
      }
    }).catch((error)=>{
      console.log(error)
    })
  },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () { 
    // this.LaunchSetIntegral().then((res)=>{
    //   console.log(res)
    // })
    this.setLimit()
    var that=this
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
    // 更新用户信息
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        var userInfo=res.data;
        wx.getUserInfo({
          success: function (res1) {
            var newuserdata=res1.userInfo;
            // if (newuserdata.nickName == userInfo.username && newuserdata.avatarUrl == userInfo.avatar){
            //   return
            // }
            var postdata = {
              uid: userInfo.uid,
              openid: userInfo.openid,
              username: newuserdata.nickName,
              avatar: newuserdata.avatarUrl
            }
            that.post('wxpay/get_miniprogram_update', postdata, 1).then(res2 => {
              console.log(res2)
              if (res2.code == 200) {
                userInfo.username = newuserdata.nickName;
                userInfo.avatar = newuserdata.avatarUrl;
                wx.setStorageSync('userInfo', userInfo)
              } else {
                wx.showToast({
                  title: res2.msg,
                  icon: 'none'
                })
              }
            }).catch(error => {
              console.log(error)
            })
          }
        })
      },
      fail:function(res){
        console.log(res)
      }
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
    barHeight:'',
    url:'',
    ishideIntegral:true,
    integralNum:0,
    sign:false,
    score:0,
    money:0
  }
})
