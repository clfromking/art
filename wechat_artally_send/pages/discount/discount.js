// pages/discount/discount.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    temp:{
      phone: "",
      code:""
    },
    data:{
      selectids:[],
      selectorderNums:[],
      orderids:[],
      gifts: [],
      totalprice:0,
      totalnum:0
    },
    poundage:1,//手续费
    codeObj: {
      text: '获取验证码',
      canclick: true,
      time: 60
    },
    ishowtip:false
  },
  //展开关闭折现须知
  toggletip:function(){
    this.setData({
      ishowtip: !this.data.ishowtip
    })
  },
  // 输入框失焦时绑定数据
  bindinputblur: function (e) {
    let data = e.detail.value,
      name = e.currentTarget.dataset.name;
    this.setData({
      [name]: data
    })
  },
  // 获取验证码按钮
  getcode: function () {
    let that = this,
      temp=that.data.temp,
      codeObj = that.data.codeObj;
    if (!codeObj.canclick) return
    if (temp.phone =="暂未绑定") {
      wx.showToast({
        title: '请先绑定手机号',
        icon: 'none'
      })
      return
    }
    if (! /^1[35678][0-9]{9}$/.test(temp.phone)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      })
      return
    }

    function clock() {
      codeObj.canclick = false;
      codeObj.text = codeObj.time + 's';
      that.setData({
        codeObj: codeObj
      })
      let t = setInterval(function () {
        codeObj.time--;
        codeObj.text = codeObj.time + 's';
        that.setData({
          codeObj: codeObj
        })
        if (codeObj.time == 0) {
          clearInterval(t);
          codeObj.canclick = true;
          codeObj.text = '重新获取';
          codeObj.time = 60;
          that.setData({
            codeObj: codeObj
          })
        }
      }, 1000)
    }
    clock();
    // return
    let postdata = { mobile: temp.phone, models: 6 };
    app.post('user/user_phone_code', postdata,1)
      .then(res => {
        //console.log(res)
        if (res.code == 200) {
          // clock();
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      })
  },
  // 确认折现按钮
  discountok:function(){
    let that=this,
      temp=this.data.temp,
      data = this.data.data;
    if(!temp.phone){
      wx.showToast({
        title: '请先绑定手机号',
        icon: 'none'
      })
      return
    }
    if (! /^[a-zA-Z0-9]{4}$/.test(temp.code)) {
      wx.showToast({
        title: '验证码格式错误',
        icon: 'none'
      })
      return
    }
    wx.showLoading({
      title: '折现中',
      mask: true
    })
    let userInfo = wx.getStorageSync('userInfo');
    let postdata = {
      uid: userInfo.uid,
      shop_id: data.selectids.join(','),
      shop_num: data.selectorderNums.join(','),
      order_id: data.orderids.join(','),
      way: 2,
      mobile: temp.phone,
      mobile_code:temp.code,
      openid: userInfo.openid
    }
    // console.log(postdata)
    // return
    app.post('order/giftbox_go', postdata).then(res=>{
      // console.log(res)
      wx.hideLoading();
      if(res.code==200){
        wx.removeStorageSync("waitOperateGifts");
        wx.redirectTo({
          url: '/pages/mygifts/mygifts?type=0&nav=1',
        })
      }else{
        wx.showToast({
          title: res.msg,
          icon:"none"
        })
      }
    }).catch(error => {
      wx.hideLoading();
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this, poundage,
      data = wx.getStorageSync('waitOperateGifts');
    app.post('order/fee',{}).then(res=>{
      if(res.code==200){
        poundage = res.data;
        that.setData({
          data: data,
          poundage: poundage
        })
      }else{
        wx.showToast({
          title: res.msg,
          icon:"none"
        })
      }
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
    let mobile=wx.getStorageSync("userInfo").mobile;
    let phone = mobile ? mobile:'暂未绑定';
    // let phone ='13212341244';
    this.setData({
      "temp.phone":phone
    })
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