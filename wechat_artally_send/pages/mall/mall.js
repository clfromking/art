// pages/mall/mall.js

let swiper_msgs = [[{ 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她1' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她' }], [{ 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她2' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她' }]]

let ware_list = [{ 'src': 'https://pic.forunart.com/artgive/wx/home_way_icon_gift.png', 'alt': '《蒙娜丽莎》雕塑', 'money': '2,000', 'id': '1' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'alt': '《蒙娜丽莎》雕塑', 'money': '2,000', 'id': '1' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'alt': '《蒙娜丽莎》雕塑', 'money': '2,000', 'id': '1' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'alt': '《蒙娜丽莎》雕塑', 'money': '2,000', 'id': '1' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'alt': '《蒙娜丽莎》雕塑', 'money': '2,000', 'id': '1' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'alt': '《蒙娜丽莎》雕塑', 'money': '2,000', 'id': '1' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'alt': '《蒙娜丽莎》雕塑', 'money': '2,000', 'id': '1' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'alt': '《蒙娜丽莎》雕塑', 'money': '2,000', 'id': '1' }]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner_src: ['https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'https://pic.forunart.com/artgive/wx/mall_banner_img.png'],
    swiper_msgs:swiper_msgs,
    ware_list:ware_list,
    inputCancel_ishide:true,
    input_val:''
  },
  search_input_focus:function(){
    this.setData({
      inputCancel_ishide: false
    })
  },
  clearInput:function(){
    
    this.setData({
      input_val: '',
      inputCancel_ishide: true,
    })
    
  },

  //去商品详情
  goDetail:function(e){
    wx.navigateTo({
      url: '../hintDetail/hintDetail?id='+e.currentTarget.dataset.id,
    })
  },

  gomallAll:function(){
    // wx.navigateTo({
    //   url: '../mallAll/mallAll',
    // })
    wx.redirectTo({
      url: '../mallAll/mallAll',
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