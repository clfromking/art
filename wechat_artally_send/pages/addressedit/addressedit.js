// pages/addressedit/addressedit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    temp:{
      name:"",
      phone:"",
      province:"",
      city:"",
      area:"",
      address:"",
      default:false
    },
    region: [],
  },
  //选择通讯录好友
  choosefriend:function(){},
  // 城市选择器
  bindRegionChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  // 定位
  lookpos:function(){
    let that=this;
    wx.chooseLocation({
      success: function (resp) {
        // console.log(resp)
        that.setData({
          'temp.address':resp.name
        })
      },
      fail:function(res){
        console.log('拒绝授权,跳转到授权引导页',res)
      }
    })
  },
  // 切换switch
  switchChange:function(e){
    let that=this,
      val = e.detail.value;
    that.setData({
      'temp.default':val
    })
  },
  // 保存按钮
  saveData:function(){
    let that=this,
      temp=this.data.temp;
    console.log(temp)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options = { type: "2", id: "1" };
    let that = this;
    if (options.type==1){
      console.log('新增')
    } else if (options.type == 2){
      console.log('编辑')
      let temp={
          name: "收货人",
          phone:"1213123123",
          province:"广东省",
          city:"广州市",
          area:"海珠区",
          address:"sdsdfsfdsaf",
          default: true
        },
        region=[temp.province, temp.city,temp.area];
      that.setData({
        temp:temp,
        region: region
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