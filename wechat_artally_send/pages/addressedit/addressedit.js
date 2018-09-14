// pages/addressedit/addressedit.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,//==1表示新增,==2表示编辑
    temp:{
      uid:"",
      id:"",
      name:"",
      phone:"",
      province:"",
      city:"",
      area:"",
      detail_address:"",
      default:false
    },
    isdefault:false,
    olddata:{},
    region: []
  },
  // 输入框失焦设置值
  blurSetInput:function(e){
    let key=e.currentTarget.dataset.type,
      val=e.detail.value;
    this.setData({
      [key]:val
    })
  },
  // 城市选择器
  bindRegionChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    let val = e.detail.value;
    this.setData({
      region: val,
      'temp.province': val[0],
      'temp.city': val[1],
      'temp.area':val[2]
    })
  },
  // 定位
  lookpos:function(){
    let that=this;
    wx.chooseLocation({
      success: function (resp) {
        // console.log(resp)
        that.setData({
          'temp.detail_address':resp.name
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
      val = e.detail.value?1:0;
    that.setData({
      'temp.default':val
    })
  },
  // 保存按钮
  saveData:function(){
    let that=this,
      type= this.data.type,
      temp = this.data.temp,
      olddata = this.data.olddata;
    // console.log(temp)
    // console.log(olddata)
    // return
    //type == 1表示新增,==2表示编辑
    if(!temp.name){
      wx.showToast({
        title: '收货人不能为空',
        icon:"none"
      })
      return
    } else if (!/^1[35678][0-9]{9}$/.test(temp.phone)){
      wx.showToast({
        title: '联系电话格式不正确',
        icon: "none"
      })
      return
    } else if (!temp.province || !temp.city || !temp.area){
      wx.showToast({
        title: '请填写完整的地区',
        icon: "none"
      })
      return
    } else if (!temp.detail_address){
      wx.showToast({
        title: '详细地址不能为空',
        icon: "none"
      })
      return
    }
    wx.showLoading({
      title: '保存中',
      mask: true
    })
    if(type==1){
      app.post('address/address_add',temp,1).then(res=>{
        // console.log(res)
        wx.hideLoading();
        if(res.code==200){
          wx.navigateBack();
        }else{
          wx.showToast({
            title: res.msg,
            icon:'none'
          })
        }
      }).catch(error => {
        wx.hideLoading();
      })
    } else if (type == 2) {
      if (JSON.stringify(temp) == JSON.stringify(olddata)){
        wx.navigateBack()
        return
      }
      app.post('address/address_edit', temp,1).then(res => {
        // console.log(res)
        wx.hideLoading();
        if (res.code == 200) {
          wx.navigateBack()
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      }).catch(error=>{
        wx.hideLoading();
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    let that = this, temp = {}, olddata = {}, region = [], userInfo = wx.getStorageSync('userInfo');
    // console.log(userInfo)
    //options.type==1表示新增,==2表示编辑
    that.setData({
      type: options.type
    })
    if (options.type==1){
      // console.log('新增')
      temp.uid = userInfo.uid;
      wx.chooseAddress({
        success: function (res) {
          temp.name = res.userName;
          temp.phone = res.telNumber;
          temp.province = res.provinceName;
          temp.city = res.cityName;
          temp.area = res.countyName;
          temp.detail_address = res.detailInfo;
          temp.default=false;
          region = [temp.province, temp.city, temp.area];
          that.setData({
            temp: temp,
            region: region
          })
        },
        fail: function (res) {
          // console.log(res)
        }
      })
      that.setData({
        temp: temp
      })
    } else if (options.type == 2){
      // console.log('编辑')
      wx.setNavigationBarTitle({
        title: '编辑收货地址'
      })
      temp =olddata=wx.getStorageSync('addressedit');
      olddata.uid = userInfo.uid;
      temp.uid = userInfo.uid;
      // console.log(temp)
      region = [temp.province, temp.city, temp.area];
      that.setData({
        temp:temp,
        olddata: olddata,
        isdefault: temp.default==1?true:false,
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
    return app.commonShare()
  }
})