// pages/my/my.js
const app = getApp() // 在需要用到request请求的页面中的顶部获取app.js中的App
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    islogin:false,
    orderNums:{
      receive:0,
      send:0,
      join: 0
    },
    gifts:[],
    selectids: [],
    operation:false,
    checkAllStatus:false
  },
  // 跳转到mygifts页面
  goMygifts(e){
    let url=e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
    })
  },
  // 获取礼物篮列表
  getgiftlist:function(){
    // wx.showLoading({
    //   title: '数据加载中',
    //   mask:true
    // })
    let that=this,
      orderNums = this.data.orderNums,
      gifts = [];
    let uid = wx.getStorageSync('userInfo').uid;
    app.post('order/giftbox',{uid:uid}).then(res=>{
      // console.log(res)
      // wx.hideLoading()
      if(res.code==200){
        orderNums.receive = res.data.receive;
        orderNums.send= res.data.send;
        orderNums.join = res.data.participation;
        gifts=res.data.lists;
        for (let i = 0; i < gifts.length; i++) {
          gifts[i].choosenum = gifts[i].num;
          gifts[i].selected = false;
        }
        that.setData({
          orderNums: orderNums,
          gifts: gifts
        })
        wx.stopPullDownRefresh()
      }else{
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    }).catch(error => {
      // wx.hideLoading();
    })
  },
  // 点击选择按钮
  chooseitem:function(e){
    let that= this,
      index = e.currentTarget.dataset.index,
      id = e.currentTarget.dataset.id,
      checkAllStatus = this.data.checkAllStatus,
      operation = this.data.operation,
      selectids = this.data.selectids,
      gifts=this.data.gifts,
      selected = gifts[index].selected;
    selected = !selected;
    
    if (selected) {
      selectids.push(id);
    } else{
      selectids.splice(selectids.indexOf(id), 1);
    }
    if (selectids.length>0){
      operation=true;
      if (selectids.length == gifts.length) {
        checkAllStatus = true;
      } else {
        checkAllStatus = false;
      }
    }else{
      operation = false;
      checkAllStatus = false;
    }
    that.setData({
      ['gifts[' + index + '].selected']: selected,
      operation: operation,
      checkAllStatus: checkAllStatus,
      selectids: selectids
    })
  },
  // 数量加减
  bindCartNum:function(e){
    let that=this,
      index = e.currentTarget.dataset.index, 
      type = e.currentTarget.dataset.type;
    let maxnum = this.data.gifts[index].num,
      num = this.data.gifts[index].choosenum;
    if(type=='+'){
      if (num < maxnum) num++;
    } else if (type == '-'){
      if(num>1) num--;
    }else{
      let val = Number(e.detail.value)
      num = val;
      if (num <1) num=1;
      else if (num > maxnum) num= maxnum;
      else num = val;
    }
    that.setData({
      ['gifts[' + index + '].choosenum']:num
    })
  },
  // 全选按钮绑定事件
  checkAll() {
    let that=this;
    let gifts=this.data.gifts,
      selectids = this.data.selectids,
      checkAllStatus = this.data.checkAllStatus;
    checkAllStatus = !checkAllStatus;
    selectids = [];
    if (checkAllStatus){
      for (let i = 0; i < gifts.length; i++) {
        gifts[i].selected = true;
        selectids.push(gifts[i].id)
      }
    }else{
      for (let i = 0; i < gifts.length; i++) {
        gifts[i].selected = false;
      }
    }
    that.setData({ 
      checkAllStatus: checkAllStatus,
      operation: checkAllStatus, 
      gifts: gifts,
      selectids: selectids
    });
  },
  // 底部操作
  operateGifts:function(e){
    app.getFormid(e);
    let data = { 
        gifts: [], 
        selectids: [], 
        selectorderNums: [], 
        orderids:[],
        totalprice: 0, totalnum:0
      },
      type=e.currentTarget.dataset.type,
      gifts = this.data.gifts,
      url;
    for (let i = 0; i < gifts.length; i++) {
      if (gifts[i].selected){
        if (gifts[i].uid== -1 ){
          if (type == 2){
            wx.showToast({
              title: '官方发布的奖品不能折现',
              icon: "none"
            })
            return
          }
          else if (type == 3){
            wx.showToast({
              title: '官方发布的奖品不能转赠',
              icon: "none"
            })
            return
          }
        }
        data.gifts.push(gifts[i]);
        data.selectids.push(gifts[i].id);
        data.orderids.push(gifts[i].order_id);
        data.selectorderNums.push(gifts[i].choosenum);
        data.totalprice += Number(gifts[i].price) * Number(gifts[i].choosenum);
        data.totalnum += Number(gifts[i].choosenum);
      }
    };
    data.totalprice = (Math.round(data.totalprice * 100) / 100).toFixed(2);
    wx.setStorage({
      key: 'waitOperateGifts',
      data: data,
      success:function(){
        // console.log(data)
        // return
        //type == 1是提货,==2是折现,==3是转赠
        if(type==1){
          url ="/pages/takegoods/takegoods"
        }else if(type==2){
          url = "/pages/discount/discount"
        }else if(type==3){
          url="/pages/sendagain/sendagain"
        }
        wx.navigateTo({
          url: url,
        })
      }
    })
  },
  // 打电话
  callphone:function(){
    wx.makePhoneCall({
      phoneNumber: '01059756813'
    })
  },
  getFormid(e){
    app.getFormid(e);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    app.islogin().then(res=>{
      // console.log(res)
      that.setData({
        userInfo:res.data
      })
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
    let userInfo =wx.getStorageSync('userInfo');
    if (userInfo.uid){
      this.setData({
        islogin:true,
        userInfo: userInfo
      })
      this.getgiftlist();
      this.data.checkAllStatus = true;
      this.checkAll();
    }else{
      this.setData({
        islogin: false
      })
    }
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
    let userInfo = wx.getStorageSync('userInfo');
    if (!userInfo.uid) {
      wx.stopPullDownRefresh()
      wx.navigateTo({
        url: '/pages/author/author',
      })
      return
    }
    this.getgiftlist();
    this.data.checkAllStatus = true;
    this.checkAll();
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