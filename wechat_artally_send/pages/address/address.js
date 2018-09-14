// pages/address/address.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addresslist:[],
    source:0     //判断来源,提货页面==1
  },
  // 获取地址列表
  getaddlist:function(){
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    let that = this;
    let uid = wx.getStorageSync('userInfo').uid;
    app.post('address/address_lists', { uid: uid }, 1).then(res => {
      // console.log(res)
      wx.hideLoading()
      if (res.code == 200) {
        that.setData({
          addresslist: res.data.address
        })
      }else{
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    }).catch(error => {
      wx.hideLoading();
    })
  },
  //提货页进来后选择地址
  chooseaddress:function(e){
    // 来源==1是提货页来
    if(this.data.source!=1) return
    let id = e.currentTarget.dataset.id,
      index = e.currentTarget.dataset.index,
      addresslist = this.data.addresslist;
    if (addresslist[index].default == 1){
      wx.navigateBack()
      return
    }
    this.setDefault(false,id,index,true);
  },
  // 设为默认地址
  setDefault:function(e,id1,index1,flag){
    let that=this,
      id = e ? e.currentTarget.dataset.id : id1,
      index=e?e.currentTarget.dataset.index:index1,
      addresslist = this.data.addresslist;
    if (addresslist[index].default==1) return
    let uid=wx.getStorageSync('userInfo').uid;
    app.post('address/address_defaults',{id:id,uid:uid},1).then(res=>{
      // console.log(res)
      if(res.code==200){
        //flag表示提货页来需要返回
        if (flag){
          wx.navigateBack()
          return
        }
        that.getaddlist();
      }else{
        wx.showToast({
          title:res.msg,
          icon:"none"
        })
      }
    })
  },
  //编辑地址
  editadd:function(e){
    let id=e.currentTarget.dataset.id,
      index = e.currentTarget.dataset.index;    
    wx.setStorageSync('addressedit', this.data.addresslist[index])
    wx.navigateTo({
      url: '/pages/addressedit/addressedit?type=2&id='+id,
    })
  },
  // 删除地址
  deladd:function(e){
    let that = this,
      id = e.currentTarget.dataset.id,
      index = e.currentTarget.dataset.index,
      addresslist = this.data.addresslist;
    wx.showModal({
      title: '提示',
      content: '您确认要删除该地址吗?',
      success: function (res) {
        if (res.confirm) {
          let userInfo = wx.getStorageSync('userInfo');
          app.post('address/address_del',{
            uid: userInfo.uid,
            id:id
          },1).then(res=>{
            // console.log(res)
            if(res.code==200){
              that.getaddlist();
            }else{
              wx.showToast({
                title: res.msg,
                icon: "none"
              })
            }
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    let source=options.source;
    this.setData({
      source: source
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
    this.getaddlist();
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