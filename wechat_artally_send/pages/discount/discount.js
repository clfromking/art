// pages/discount/discount.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gifts: []
  },
  // 获取礼物列表
  getGifts: function () {
    let gifts = [
      {
        id: 1,
        img: 'https://pic.forunart.com/artgive/wx/mall_banner_img.png',
        name: '事实上',
        num: '1',
        price: 200
      }
    ];
    this.setData({
      gifts: gifts
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGifts();
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