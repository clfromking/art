// pages/mygifts/mygifts.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles: ['提货/折现记录', '我送出的', '我参与的'],
    titleIndex: 0,
    titleUrls: ['order/mygifts_receive', 'order/mygifts_send','order/mygifts_participation'],
    posturl: '',
    navlist:[
      ['已提货', '已折现'],
      ['礼物红包', '限时开奖', '人满开奖'],
      ['礼物红包', '限时开奖','人满开奖']
    ],
    navIndex: 0,
    orderlist:[]
  },
  // 导航栏筛选
  chooseNav:function(e){
    let val=e.currentTarget.dataset.index;
    if (val == this.data.navIndex) return
    this.setData({
      navIndex: val
    })
    this.getOrders();
  },
  // 获取我收到的订单列表
  getOrders:function(){
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    let that=this,
      posturl = this.data.posturl,
      way = this.data.navIndex+1;
    let uid = wx.getStorageSync('userInfo').uid;
    app.post(posturl, { uid: uid, way: way}).then(res=>{
      // console.log(res)
      wx.hideLoading()
      if(res.code==200){
        that.setData({
          orderlist: res.data.lists
        })
      }else{
        wx.showToast({
          title: res.msg,
          icon:'none'
        })
      }
    }).catch(error => {
      wx.hideLoading();
    })
  },
  // 进入详情
  goDetail:function(e){
    if (this.data.titleIndex==0) return
    let order_id = e.currentTarget.dataset.order_id;
    wx.navigateTo({
      url: '/pages/lotterydetail/lotterydetail?source=my&type='+this.data.titleIndex+'&order_id=' + order_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    let that=this,
      type = Number(options.type),
      nav = options.nav ? Number(options.nav) : 0,
      titles = this.data.titles,
      posturl = this.data.titleUrls[type];
    wx.setNavigationBarTitle({
      title:titles[type]
    })
    this.setData({
      titleIndex: options.type,
      navIndex: nav,
      posturl:posturl
    })
    that.getOrders();
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
    this.getOrders();
    wx.stopPullDownRefresh()
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