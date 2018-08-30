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
      county:"",
      detail:"",
      default:false
    },
    region: [],
  },
  // 城市选择器
  bindRegionChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    let val = e.detail.value;
    this.setData({
      region: val,
      'temp.province': val[0],
      'temp.city': val[1],
      'temp.county':val[2]
    })
  },
  // 定位
  lookpos:function(){
    let that=this;
    wx.chooseLocation({
      success: function (resp) {
        // console.log(resp)
        that.setData({
          'temp.detail':resp.name
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
    console.log(options)
    let that = this, temp = {}, region=[];
    if (options.type==1){
      console.log('新增')
      wx.chooseAddress({
        success: function (res) {
          temp.name = res.userName;
          temp.phone = res.telNumber;
          temp.province = res.provinceName;
          temp.city = res.cityName;
          temp.county = res.countyName;
          temp.detail = res.detailInfo;
          temp.default=false;
          region = [temp.province, temp.city, temp.county];
          that.setData({
            temp: temp,
            region: region
          })
        },
        fail: function (res) {
          console.log(res)
        }
      })
    } else if (options.type == 2){
      console.log('编辑')
      temp =wx.getStorageSync('addressedit');
      console.log(temp)
      region = [temp.province, temp.city, temp.county];
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