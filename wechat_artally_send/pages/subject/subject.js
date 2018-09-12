// pages/subject/subject.js
const app=getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    title_img_src:'',
    ware_list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.id){
      app.post('gifts/giftspecial', { 'giftspecial_id': options.id }).then((res) => {
        console.log(res)
        if (res.code == 200) {
          that.setData({
            title_img_src: res.data.giftspecial.image,
            ware_list: res.data.gifts
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    }
    else if (options.screenid){

    }

    console.log(options.id)
   
    
  },


  goDetail:function(e){
    wx.navigateTo({
      url: '../hintDetail/hintDetail?id='+e.currentTarget.dataset.id,
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
  
  },
  getFormid: function (e) {
    app.getFormid(e)
  },
})