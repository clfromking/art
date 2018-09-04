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
      selectorderNums:[]
    }
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
    // wx.login({
    //   success:function(res){
    //     console.log(res.code)
    //   }
    // })
    let that=this;
    if (!that.data.addressinfo.id){
      wx.showToast({
        title: '请添加地址',
        icon:'none',
        duration: 2000
      })
      return
    }
    console.log(1)
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