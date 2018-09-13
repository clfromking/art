// pages/joinpeople/joinpeople.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    heads: [
    ],
    title:''
  },

  //预览大图
  loadpreviewImg:function(e){
    wx.previewImage({
      urls: [e.currentTarget.dataset.src],
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that=this
    var title='参与'
    var postData={}
    if (options.inviter) {
      postData = { 'order_id': options.order_id, 'uid': options.uid,'inviter':options.inviter}
      title='为你助力'
    }
    else{
      postData = { 'order_id': options.order_id, 'uid': options.uid}
    }
    app.post('order/client_list',postData).then((res)=>{
      console.log(res)
      if(res.code==200){
        that.setData({
          heads:res.data.list,
          title
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
    return app.commonShare()
  }
})