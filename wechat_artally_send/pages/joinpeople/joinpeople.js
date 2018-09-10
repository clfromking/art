// pages/joinpeople/joinpeople.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    heads: [
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
    ],
  },

  //预览大图
  loadpreviewImg:function(e){
    console.log(e.currentTarget.dataset.src)
    wx.previewImage({
      urls: [e.currentTarget.dataset.src],
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    app.post('order/client_list',{'order_id':options.order_id,'uid':options.uid}).then((res)=>{
      console.log(res)
      if(res.code==200){
        that.setData({
          heads:res.data.list
        })
      }
    }).catch((error)=>{
      console.log(error)
    })
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