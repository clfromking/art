// pages/mygifts/mygifts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles: ['我收到的','我送出的','我参与的'],
    navlist:[
      ['已提货', '已折现', '已转增'],
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
    this.setData({
      navIndex: val
    })
  },
  // 获取订单列表
  getOrders:function(){
    let that=this,
      orderlist=[
      {
        number:32131203123,
        status:1,
        satustext:'折现中',
        goods:{
          img:'https://pic.forunart.com/artgive/wx/mall_banner_img.png',
          name:'蒙娜丽莎',
          num:1,
          price:2000,
          time:'1212121212'
        }
      },
      {
        number: 3456789,
        status: 2,
        satustext: '已折现',
        goods: {
          img: 'https://pic.forunart.com/artgive/wx/mall_banner_img.png',
          name: '蒙娜丽莎2',
          num: 3,
          price: 1000,
          time: '1212121212'
        }
      }
    ];
    that.setData({
      orderlist: orderlist
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    options={type:2};
    this.setData({
      titleIndex: options.type,
      navIndex:0
    })
    if (options.type==0){
      wx.setNavigationBarTitle({
        title: this.data.titles[0]
      })
    } else if (options.type == 1) {
      wx.setNavigationBarTitle({
        title: this.data.titles[1]
      })
    } else if (options.type == 2) {
      wx.setNavigationBarTitle({
        title: this.data.titles[2]
      })
    }
    this.getOrders();
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