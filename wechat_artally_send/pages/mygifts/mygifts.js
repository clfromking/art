// pages/mygifts/mygifts.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles: ['我收到的','我送出的','我参与的'],
    navlist:[
      ['已提货', '已折现', '已转赠'],
      ['礼物红包', '定时红包', '人满开奖'],
      ['待开奖','已开奖','未中奖'],
    ],
    titleIndex: 0,
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
    this.getReceiveOrders(val+1);
  },
  // 获取我收到的订单列表
  getReceiveOrders:function(way=1){
    let that=this,
      orderlist=[];
    app.post('order/mygifts_receive', { uid: 2, way: way}).then(res=>{
      console.log(res)
      if(res.code==200){
        orderlist=res.data.lists;
        that.setData({
          orderlist: orderlist
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    // console.log(options)
    this.setData({
      titleIndex: options.type,
      navIndex:0
    })
    if (options.type==0){
      wx.setNavigationBarTitle({
        title: this.data.titles[0]
      })
      that.getReceiveOrders();
    } else if (options.type == 1) {
      wx.setNavigationBarTitle({
        title: this.data.titles[1]
      })
    } else if (options.type == 2) {
      wx.setNavigationBarTitle({
        title: this.data.titles[2]
      })
    }
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