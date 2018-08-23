// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addresslist:[]
  },
  // 获取地址列表
  getaddlist:function(){
    let that=this;
    let addresslist=[
      {
        id:1,
        name:'哈哈哈',
        phone:'13213412412',
        region:'北京市北京市好阳区',
        detail:'和法国进口还舍不得v',
        default:true,
      },{
        id: 2,
        name: '哈哈哈1',
        phone: '13213412412',
        region: '北京市北京市好阳区',
        detail: '和法国进口还舍不得v',
        default: false,
      }, {
        id: 3,
        name: '哈哈哈2',
        phone: '13213412412',
        region: '北京市北京市好阳区',
        detail: '和法国进口还舍不得v',
        default: false,
      }
    ]
    that.setData({
      addresslist: addresslist
    })
  },
  // 设为默认地址
  setDefault:function(e){
    let that=this,
      id = e.currentTarget.dataset.id,
      index=e.currentTarget.dataset.index,
      addresslist = this.data.addresslist;
    if (addresslist[index].default) return
    addresslist[0].default = false;
    addresslist[index].default=true;
    let tempdata = addresslist[0];
    addresslist[0] = addresslist[index];
    addresslist[index] = tempdata;
    that.setData({
      addresslist: addresslist
    })
  },
  // 删除地址
  deladd:function(e){
    let that = this,
      id = e.currentTarget.dataset.id,
      index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '您确认要删除该地址吗?',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getaddlist();
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