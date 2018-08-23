// pages/my/my.js
const app = getApp() // 在需要用到request请求的页面中的顶部获取app.js中的App
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav:0,
    gifts:[],
    selectids: [],
    operation:false,
    checkAllStatus:false
  },
  getgiftlist:function(){
    let that=this;
    let gifts = [
      {
        id: '1',
        img: 'https://pic.forunart.com/artgive/wx/mall_banner_img.png',
        name: '凤飞飞',
        dec: '更合适的附件是快递费',
        total: 2, fromimg: 'https://pic.forunart.com/artgive/wx/mall_label_birthday.png',
        fromname: "你好",
        createtime: '2018.10.23 12:20:22'
      },
      {
        id: '2',
        img: 'https://pic.forunart.com/artgive/wx/mall_banner_img.png',
        name: '凤飞飞2',
        dec: '是你发神经的浪费你接收到',
        total: 2, fromimg: 'https://pic.forunart.com/artgive/wx/mall_label_birthday.png',
        fromname: "你好",
        createtime: '2018.10.23 12:20:22'
      },
      {
        id: '3',
        img: 'https://pic.forunart.com/artgive/wx/mall_banner_img.png',
        name: '凤飞飞2',
        dec: '是你发神经的浪费你接收到',
        total: 2, fromimg: 'https://pic.forunart.com/artgive/wx/mall_label_birthday.png',
        fromname: "你好",
        createtime: '2018.10.23 12:20:22'
      }
    ]
    for (let i = 0; i < gifts.length;i++){
      gifts[i].num = 1;
      gifts[i].selected=false;
    }
    that.setData({
      gifts:gifts
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
    let maxnum = this.data.gifts[index].total,
      num = this.data.gifts[index].num;
    if(type=='+'){
      if (num < maxnum) num++;
    }else {
      if(num>1) num--;
    }
    that.setData({
      ['gifts[' + index + '].num']:num
    })
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
    let selectids=[], selectnums=[],
      gifts = this.data.gifts;
    for (let i = 0; i < gifts.length; i++) {
      if (gifts[i].selected){
        selectids.push(gifts[i].id)
        selectnums.push(gifts[i].num)
      }
    }
    // console.log(selectids)
    // console.log(selectnums)
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