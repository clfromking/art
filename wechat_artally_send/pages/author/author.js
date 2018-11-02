// pages/author/author.js
const app=getApp()
let code
Page({

  /**
   * 页面的初始数据
   */
  data: {
    issaveImg:false,
    scene:''
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
                if (res.code == 600) {
                  wx.showToast({
                    icon: 'none',
                    title: res.msg,
                    mask:true
                  })
                  // that.bindgetuserinfo(e)
                }
                else if (res.code == 200) {
                  wx.setStorage({
                    key: 'userInfo',
                    data: res.data,
                    success: function (res1) {
                      app.post('grade/cat',{"uid":res.data.uid}).then((res)=>{
                        console.log(res)
                        if(res.code==200){
                          app.globalData.integralNum = res.data
                          if(that.scene=='integral'){

                          }
                          else{
                            setTimeout(function(){
                              wx.navigateBack({

                              })
                            },500)
                          }
                        }
                        
                      }).catch((error)=>{
                        console.log(error)
                      })
                      wx.showToast({
                        icon: 'none',
                        title: '登录成功',
                        mask: true
                      })
                      if(that.data.scene=='integral'){
                        console.log(res.data)
                        app.post("grade/cat",{"uid":res.data.uid}).then((res1)=>{
                          console.log(res1)
                          if(res1.code==600){
                            app.post('grade/add',{"uid":res.data.uid,"type":"login"}).then((res2)=>{
                              console.log(res2)
                              app.post("grade/cat", { "uid": res.data.uid }).then((res)=>{
                                console.log(res)
                                app.globalData.integralNum = res.data
                                wx.navigateBack({
                                  success: function () {
                                    
                                    // console.log('返回')
                                    wx.showToast({
                                      title: '领取成功',
                                      mask: true
                                    })
                                  }
                                })
                              }).catch((error)=>{

                              })
                            }).catch((error)=>{
                              console.log(error)
                            })
                            console.log('没领过')
                          }
                          else{
                            console.log('领过')
                            app.globalData.integralNum = res1.data
                            console.log(app.globalData.integralNum)
                            wx.navigateBack({
                              success: function () {
                                
                                // console.log('返回')
                                wx.showToast({
                                  title: '您已领取',
                                  mask: true
                                })
                              }
                            })
                          }
                        }).catch((error)=>{
                          console.log(error)
                        })
                        
                      }
                      else{
                        setTimeout(function () {
                          wx.navigateBack({

                          })
                        }, 500)
                      }
                     
                    },
                    fail:function(res){
                      wx.showToast({
                        title: '读取失败，请重试',
                        icon:'none',
                        mask:true
                      })
                    }
                  })
                }
              }).catch((error) => {
                wx.showToast({
                  icon: 'none',
                  title: '获取信息失败，请重试',
                  mask: true
                })
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
    console.log(options.scene)
    if (options.scene=='integral'){
      this.setData({
        scene:'integral'
      })
    }
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