// pages/author/author.js
const app=getApp()
let code
Page({

  /**
   * 页面的初始数据
   */
  data: {
    issaveImg:false
  },

  //获取用户信息按钮回调
  bindgetuserinfo:function(e){ 
    var that=this
    if(e.detail.userInfo){
      wx.login({
        success:function(res){

          wx.getUserInfo({
            withCredentials:true,
            success:function(res1){
              var postData = { 'code': res.code, 'encryptedData': res1.encryptedData, 'iv': res1.iv }
              app.post('wxpay/get_miniprogram_userinfo', postData, 1).then((res) => {
                console.log(res)
                // res.code=600
                if (res.code == 600) {
                  wx.showToast({
                    icon: 'none',
                    title: '获取信息失败，请重试',
                  })
                  // that.bindgetuserinfo(e)
                }
                else if (res.code == 200) {
                  console.log(res)
                  wx.setStorage({
                    key: 'userInfo',
                    data: res.data,
                    success: function (res) {
                      wx.navigateBack({


                      })
                    },
                  })
                }
              }).catch((error) => {
                console.log(error)
              })
            },
            fail: function (error){
              console.log(error)
            }
          })
        }
      })
      console.log(e.detail.userInfo)
      // wx.setStorage({
      //   key: 'uid',
      //   data: 2,
      //   success:function(){
      //     wx.navigateBack({
            
      //     })
      //     // wx.switchTab({
      //     //   url: '../index/index',
      //     // })
      //   }
      // })
    }
  },

  //点击确认授权登录
  loginTap:function(){
    // wx.login({
    //   success:function(res){
    //     code=res.code
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type=='saveImg'){
      this.setData({
        issaveImg:true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  openSettingTap:function(e){
    // console.log(e)
    wx.navigateBack({
      delta:2
    })
  }
})