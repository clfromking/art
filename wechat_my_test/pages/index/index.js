let a=false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:''
  },
  getLocation:function(){
    var that=this
    wx.getSetting({
      success:function(res){
        console.log(res)
        if(!res.authSetting['scope.userLocation']){
          console.log('没有授权')
          wx.authorize({
            scope: 'scope.userLocation',
            success:function(res){
              wx.chooseLocation({
                success: function(res) {
                  that.setData({
                    address:res.name
                  })
                },
              })
            },
            fail:function(res){
              if(a==false){
                a=true
              }
              else{
                wx.navigateTo({
                  url: '../lead/lead',
                })
              }
             
            }
          })
          
        }
        else{
          console.log('已经授权')
          wx.chooseLocation({
            success: function (res) {
              that.setData({
                address: res.name
              })
            },
          })
        }
      },
      fail:function(res){
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    
  }
})