// pages/my/my.js
const app = getApp() // 在需要用到request请求的页面中的顶部获取app.js中的App
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav:0,
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
  getgiftlist:function(){
    let that=this,
      orderNums = this.data.orderNums,
      gifts = [];
    app.post('order/giftbox',{uid:2}).then(res=>{
      // console.log(res)
      if(res.code==200){
        orderNums.receive = res.data.receive;
        orderNums.send= res.data.send;
        orderNums.join = res.data.participation;
        res.data.lists[1].num = 2;
        res.data.lists[2].num=20;
        gifts=res.data.lists;
        for (let i = 0; i < gifts.length; i++) {
          gifts[i].choosenum = gifts[i].num;
          gifts[i].selected = false;
        }
        that.setData({
          orderNums: orderNums,
          gifts: gifts
        })
      }
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
  // 数量输入
  changenum:function(e){
    console.log(e)
    let val = e.detail.value
  },
  // 全选按钮绑定事件
  checkAll() {
    let that=this;
    let gifts=this.data.gifts,
      selectids = this.data.selectids,
      checkAllStatus = this.data.checkAllStatus;
    checkAllStatus = !checkAllStatus;
    if (checkAllStatus){
      for (let i = 0; i < gifts.length; i++) {
        gifts[i].selected = true;
        selectids.push(gifts[i].id)
      }
    }else{
      for (let i = 0; i < gifts.length; i++) {
        gifts[i].selected = false;
      }
      selectids=[];
    }
    that.setData({ 
      checkAllStatus: checkAllStatus,
      operation: checkAllStatus, 
      gifts: gifts,
      selectids: selectids
    });
  },
  // 提货
  takegoods:function(){
    let data = { gifts: [], selectids:[], selectorderNums:[]},
      gifts = this.data.gifts;
    for (let i = 0; i < gifts.length; i++) {
      if (gifts[i].selected){
        data.gifts.push(gifts[i])
        data.selectids.push(gifts[i].id)
        data.selectorderNums.push(gifts[i].choosenum)
      }
    }
    wx.setStorage({
      key: 'takegoods',
      data: data,
      success:function(){
        // console.log(data)
        // return
        wx.navigateTo({
          url: '/pages/takegoods/takegoods',
        })
      }
    })
  },
  // 折现
  discount:function(){
    
  },
  // 转赠
  sendother:function(){
    
  },
  // 打电话
  callphone:function(){
    wx.makePhoneCall({
      phoneNumber: '4009001813'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getgiftlist();
    let uid=2;
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