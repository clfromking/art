// pages/takegoods/takegoods.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressinfo:{},
    data:{
      gifts:[],
      selectids:[],
      orderids:[],
      selectorderNums:[]
    },
    disabled:false
  },
  // 获取地址
  getaddress:function(){
    let that=this;
    app.post('address/address_lists',{uid:2},1).then(res=>{
      // console.log(res)
      if(res.code==200){
        if (res.data.address.length>0){
          that.setData({
            addressinfo: res.data.address[0]
          })
        }
      }else{
        wx.showToast({
          title: res.msg,
          icon:"none"
        })
      }
    })
  },
  // 确认提货按钮
  takegoodsok:function(){
    if (this.data.disabled) return
    let that = this;
    if (!that.data.addressinfo.id){
      wx.showToast({
        title: '请添加地址',
        icon:'none',
        duration: 2000
      })
      return
    }
    that.setData({
      disabled: true
    })
    let data = that.data.data;
    let postdata={
      uid: wx.getStorageSync('userInfo').uid,
      shop_id: data.selectids.join(','),
      shop_num: data.selectorderNums.join(','),
      order_id: data.orderids.join(','),
      way:1
    }
    // console.log(postdata)
    app.post('order/giftbox_go', postdata).then(res=>{
      // console.log(res)
      if(res.code==200){
        wx.removeStorageSync('waitOperateGifts')
        wx.redirectTo({
          url: '/pages/mygifts/mygifts?type=0&nav=0',
        })
      }else{
        that.setData({
          disabled: false
        })
        wx.showToast({
          title: res.msg,
          icon:"none"
        })      
      }
    }).catch(error=>{
      that.setData({
        disabled: false
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this,
      data = wx.getStorageSync('waitOperateGifts');
    that.setData({
      data:data
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
    this.getaddress();
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