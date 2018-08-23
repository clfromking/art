// pages/hintDetail/hintDetail.js
const app=getApp()
let swiper_imgs = ['https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'https://pic.forunart.com/artgive/wx/mall_nav_icon_all_pressed.png', 'https://pic.forunart.com/artgive/wx/mall_nav_icon_all_pressed.png','https://pic.forunart.com/artgive/wx/mall_nav_icon_all_pressed.png']
let detail_msg={'title':'蒙娜丽莎 雕塑','alt':'现代雕塑 艺术品摆件 云上弦音','money':'2,000','num':'192'}
let prec=[true,false]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper_imgs:swiper_imgs,
    detail_msg:detail_msg,
    isHidebuy:true,
    prec:prec,
    gifts_num:1
  },
  buyThis:function(){
    this.setData({
      isHidebuy:false
    })
  },
  closeBuy:function(){
    this.setData({
      isHidebuy:true
    })
  },

  selectPrec:function(e){
    var prec_arr=this.data.prec
    for(var i=0;i<prec_arr.length;i++){
      prec_arr[i]=false
    }
    prec_arr[e.currentTarget.dataset.id]=true

    this.setData({
      prec: prec_arr
    })
  },

  addNum:function(){
    if (this.data.gifts_num == this.data.detail_msg.num){
      return
    }
    var gifts_num=this.data.gifts_num;
    gifts_num++
    this.setData({
      gifts_num: gifts_num
    })
  },

  subNum:function(){
    if (this.data.gifts_num == 1) {
      return
    }
    var gifts_num = this.data.gifts_num;
    gifts_num--
    this.setData({
      gifts_num: gifts_num
    })
  },

  inputNum:function(e){
    this.setData({
      gifts_num:e.detail.value
    })
    // console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // app.post()
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