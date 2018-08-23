// pages/takegoods/takegoods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressinfo:{},
    gifts:[]
  },
  // 获取地址
  getaddress:function(){
    let addressinfo={
      id:1,
      name:'啊啊啊',
      phone:'3456789',
      region:'北京市北京市朝阳区',
      detail:'分工会尽快了'
    }
    this.setData({
      addressinfo: addressinfo
    })
  },
  // 获取礼物列表
  getGifts:function(){
    let gifts =[
      {
        id:1,
        img:'https://pic.forunart.com/artgive/wx/mall_banner_img.png',
        name:'事实上',
        num:'1',
        price:200
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
    this.getaddress();
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