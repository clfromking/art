// pages/joinpeople/joinpeople.js
const app=getApp()
var title = '参与'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    heads: [
    ],
    title:'',
    pages:1,
    total:0,
    inviter:0,
    order_id:0,
    uid:0,
    iscontinue:true
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
    var postData={}
    var order_id=options.order_id
    var uid=options.uid
    var inviter = options.inviter ? options.inviter:''
    that.setData({
      order_id,
      uid,
      inviter
    })
    if (options.inviter) {
      postData = { 'order_id': options.order_id, 'uid': options.uid,'inviter':options.inviter,'pages':that.data.pages}
      title='为你助力'
    }
    else{
      postData = { 'order_id': options.order_id, 'uid': options.uid, 'pages': that.data.pages}
      title='参加'
    }
    app.post('order/client_list', postData).then((res) => {
      console.log(res)
      if (res.code == 200) {
        that.setData({
          heads: res.data.list,
          title,
          total: res.data.total
        })
      }
    }).catch((error) => {
      console.log(error)
    })
    // that.loadavatar(postData,title)
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
    if (this.data.iscontinue==false){
      return
    }
    var pages=this.data.pages
    pages=pages+1
    console.log(pages)
    this.setData({
      pages:pages
    })
    var postData={}
    var iscontinue=true
    if (this.data.title=='为你助力') {
      postData = { 'order_id': this.data.order_id, 'uid': this.data.uid, 'inviter': this.data.inviter, 'pages': this.data.pages }
      title = '为你助力'
    }
    else {
      postData = { 'order_id': this.data.order_id, 'uid': this.data.uid, 'pages': this.data.pages }
      title = '参加'
    }
    var that=this
    app.post('order/client_list',postData).then((res)=>{
      var imgData = that.data.heads
      for(var i=0;i<res.data.list.length;i++){
        imgData.push(res.data.list[i])
      }
      if(res.data.list.length<=0){
        iscontinue=false
      }    
      that.setData({
        heads: imgData,
        iscontinue
      })
    }).catch((error)=>{
      console.log(error)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return app.commonShare()
  }
})