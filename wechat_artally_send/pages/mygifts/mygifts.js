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
    orderlist:[],
    pages:1,
    nomore:false
  },
  // 导航栏筛选
  chooseNav:function(e){
    let val=e.currentTarget.dataset.index;
    if (val == this.data.navIndex) return
    this.setData({
      navIndex: val,
      pages:1,
      nomore:false,
      orderlist:[]
    })
    this.getOrders();
  },
  // 获取我收到的订单列表
  getOrders:function(){
    // wx.showLoading({
    //   title: '数据加载中',
    //   mask: true
    // })
    let that=this,
      posturl = this.data.posturl,
      way = this.data.navIndex+1,
      pages=this.data.pages,
      orderlist = this.data.orderlist;
    let postdata={
      uid :wx.getStorageSync('userInfo').uid,
      way: way,
      pages:pages
    }
    app.post(posturl, postdata).then(res=>{
      // console.log(res)
      // wx.hideLoading()
      that.setData({
        nomore: true
      })
      if(res.code==200){
        if (res.data.lists.length>0){
          orderlist = orderlist.concat(res.data.lists);
          that.setData({
            orderlist: orderlist,
            nomore: false
          })
        }
        wx.stopPullDownRefresh()
      }else{
        wx.showToast({
          title: res.msg,
          icon:'none'
        })
      }
    }).catch(error => {
      // wx.hideLoading();
      that.setData({
        nomore: true
      })
      wx.showToast({
        title: '服务器繁忙，请稍后重试',
        icon: 'none'
      })
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
      let that = this,
      type = Number(options.type),
      nav = options.nav ? Number(options.nav) : 0,
      titles = this.data.titles,
      posturl = this.data.titleUrls[type];
      that.setData({
        titleIndex: type,
        navIndex: nav,
        posturl:posturl
      })
      wx.setNavigationBarTitle({
        title: titles[type]
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
    this.setData({
      pages:1,
      nomore:false,
      orderlist:[]
    })
    this.getOrders();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let pages=this.data.pages,nomore=this.data.nomore;
    if (nomore) return
    this.setData({
      pages: ++pages
    })
    this.getOrders();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return app.commonShare()
  }
})