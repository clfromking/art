// pages/bindphone/bindphone.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    temp:{
      phone: '',
      code: ''
    },
    codeObj:{
      text: '获取验证码',
      canclick: true,
      time: 60
    }
  },
  // 输入框失焦时绑定数据
  bindinputblur:function(e){
    let data = e.detail.value,
      name = e.currentTarget.dataset.name;
    this.setData({
      [name]:data
    })
  },
  // 获取验证码按钮
  getcode:function(){
    let that = this,
      codeObj = that.data.codeObj;
    if (!codeObj.canclick) return
    if (! /^1[35678][0-9]{9}$/.test(that.data.temp.phone)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none',
        duration: 2000
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
    // app.post('member/phoneCode' + sign(), { phone: this.temp.phone })
    //   .then(res => {
    //     //console.log(res)
    //     if (res.data.code === 200) {
    //       clock();
    //     } else this.alertMsg = res.data.msg;
    //   })
  },
  // 确认绑定按钮
  bindphone:function(){
    if (! /^1[35678][0-9]{9}$/.test(this.data.temp.phone)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (! /^[a-zA-Z0-9]{4}$/.test(this.data.temp.code)) {
      wx.showToast({
        title: '验证码格式错误',
        icon: 'none',
        duration: 2000
      })
      return
    }
    console.log(this.data.temp)
    // app.post('member/phoneCode' + sign(), { phone: this.temp.phone })
    //   .then(res => {
    //     //console.log(res)
    //     if (res.data.code === 200) {
    //       
    //     } else this.alertMsg = res.data.msg;
    //   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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