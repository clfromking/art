// pages/addressedit/addressedit.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,//==1表示新增,==2表示编辑
    temp:{
      id:"",
      name:"",
      phone:"",
      province:"",
      city:"",
      area:"",
      detail_address:"",
      default:false
    },
    olddata:{},
    region: [],
    disabled:false
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
    if (this.data.disabled) return
    let that=this,
      type= this.data.type,
      temp = this.data.temp,
      olddata = this.data.olddata;
    // console.log(temp, olddata)
    //type == 1表示新增,==2表示编辑
    if(!temp.name){
      wx.showToast({
        title: '收货人不能为空',
        icon:"none"
      })
      return
    } else if (!/^1[35678][0-9]{9}$/.test(temp.phone)){
      wx.showToast({
        title: '联系电话格式不正确',
        icon: "none"
      })
      return
    } else if (!temp.province || !temp.city || !temp.area){
      wx.showToast({
        title: '请填写完整的地区',
        icon: "none"
      })
      return
    } else if (!temp.detail_address){
      wx.showToast({
        title: '详细地址不能为空',
        icon: "none"
      })
      return
    }
    that.setData({
      disabled:true
    })
    if(type==1){
      temp.uid=2;
      app.post('address/address_add',temp,1).then(res=>{
        // console.log(res)
        if(res.code==200){
          wx.navigateBack();
        }else{
          that.setData({
            disabled: true
          })
          wx.showToast({
            title: res.msg,
            icon:'none'
          })
        }
      }).catch(error => {
        that.setData({
          disabled: true
        })
      })
    } else if (type == 2) {
      if (JSON.stringify(temp) == JSON.stringify(olddata)){
        wx.navigateBack()
        return
      }
      app.post('address/address_edit', temp,1).then(res => {
        // console.log(res)
        if (res.code == 200) {
          wx.navigateBack()
        } else {
          that.setData({
            disabled: true
          })
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      }).catch(error=>{
        that.setData({
          disabled: true
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    let that = this, temp = {}, olddata={}, region=[];
    //options.type==1表示新增,==2表示编辑
    that.setData({
      type: options.type
    })
    if (options.type==1){
      // console.log('新增')
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
    } else if (options.type == 2){
      // console.log('编辑')
      wx.setNavigationBarTitle({
        title: '编辑收货地址'
      })
      temp =olddata=wx.getStorageSync('addressedit');
      // console.log(temp)
      region = [temp.province, temp.city, temp.area];
      that.setData({
        temp:temp,
        olddata: olddata,
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