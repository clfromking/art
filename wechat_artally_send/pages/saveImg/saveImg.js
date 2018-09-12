// pages/saveImg/saveImg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:'/pages/imgs/1.png',
    isauthor:true
  },

  saveImg:function(e){
    var that=this
    console.log(1)
    wx.authorize({
      scope: 'scope.writePhotosAlbum',
      success:function(res){
        wx.saveImageToPhotosAlbum({
          filePath: that.data.src,
          success: function (res) {
            wx.showToast({
              title: '保存成功',
            })
          },
          fail: function (res) {
            wx.showToast({
              title: '保存失败，请重试',
              icon:'none'
            })
          }
        })
      },
      fail:function(res){
        if(that.data.isauthor==false){
          wx.navigateTo({
            url: '../author/author?type=saveImg',
          })
          return
        }
        that.setData({
          isauthor:false
        })
        console.log('失败')
      }
    })
    // wx.saveImageToPhotosAlbum({
    //   filePath: that.data.src,
    //   success: function (res) {
    //     console.log(res)
    //   },
    //   fail: function (res) {
    //     console.log(res)

    //   }
    // })
    
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