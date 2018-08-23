// pages/lottery/lottery.js
let lottery_list = [{ 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'name': '云上弦音 雕塑', 'num': 1, 'alt': '现代雕塑 艺术品摆件 云上弦音', 'year': '2014年', 'time': '2月3日 18:30', 'id': 0 }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'name': '云上弦音 雕塑', 'num': 1, 'alt': '现代雕塑 艺术品摆件 云上弦音', 'year': '2014年', 'time': '2月3日 18:30', 'id': 1 }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'name': '云上弦音 雕塑', 'num': 1, 'alt': '现代雕塑 艺术品摆件 云上弦音', 'year': '2014年', 'time': '2月3日 18:30', 'id': 2 }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'name': '云上弦音 雕塑', 'num': 1, 'alt': '现代雕塑 艺术品摆件 云上弦音', 'year': '2014年', 'time': '2月3日 18:30', 'id': 3 }]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lottery_list:lottery_list,  //抽奖列表
    lottery_btnText:'立即抽奖'
  },

  //点击抽奖事件
  goRaffle:function(e){
    wx.navigateTo({
      url: '../raffle/raffle?time=' + this.data.lottery_list[e.currentTarget.dataset.id].time,
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