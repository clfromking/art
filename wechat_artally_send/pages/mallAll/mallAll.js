// pages/mallAll/mallAll.js
let ware_list = [{ 'src': 'https://pic.forunart.com/artgive/wx/home_way_icon_gift.png', 'alt': '《蒙娜丽莎》雕塑', 'money': '2,000', 'id': '1' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'alt': '《蒙娜丽莎》雕塑', 'money': '2,000', 'id': '1' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'alt': '《蒙娜丽莎》雕塑', 'money': '2,000', 'id': '1' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'alt': '《蒙娜丽莎》雕塑', 'money': '2,000', 'id': '1' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'alt': '《蒙娜丽莎》雕塑', 'money': '2,000', 'id': '1' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'alt': '《蒙娜丽莎》雕塑', 'money': '2,000', 'id': '1' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'alt': '《蒙娜丽莎》雕塑', 'money': '2,000', 'id': '1' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'alt': '《蒙娜丽莎》雕塑', 'money': '2,000', 'id': '1' }]

let price_screen = [{ 'text': '全部', 'isselect': true, 'id': 0 }, { 'text': '100元以下', 'isselect': false, 'id': 1 }, { 'text': '100-500元', 'isselect': false, 'id': 2 }, { 'text': '500-1000元', 'isselect': false, 'id': 3 }, { 'text': '1000元以上', 'isselect': false, 'id': 4}]
let sc_screen = [{ 'text': 'hahaha', 'isselect': true, 'id': 0 }, { 'text': 'aaaa', 'isselect': false, 'id': 1 }, { 'text': 'bbbb', 'isselect': false, 'id': 2 }, { 'text': 'cccc', 'isselect': false, 'id': 3 }]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner_src: [{ 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'id': 0 }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'id': 1 }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'id': 2 }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'id': 3 }],   //banner图src
    inputCancel_ishide: true, //取消按钮是否隐藏
    input_val: '',            //绑定的搜索框中的值
    ware_list: ware_list,     //下方商品列表
    screen_msg:price_screen,  //筛选选项数组
    ishideScreen:true,       //是否隐藏筛选选项
    isScreen:[false,false],  //出现的下拉筛选选项定义的布尔值数组，与两个按钮对应，为true时显示，并且根据索引绑定相应的筛选选项数组
    priceCover:'', //价格 覆盖上的文字
    scCover:'',   //排序 覆盖上的文字
    screenId:0,    //出现的下拉筛选选项绑定的父元素的ID，即价格或者排序
    isfixed:false,  //筛选按钮是否固定
    scrollTop_num:0,  //scroll-view距离顶部的数值
    swiper_block: [true, false, false, false]
  },

  //搜索输入框聚焦事件
  search_input_focus: function () {
    this.setData({
      inputCancel_ishide: false
    })
  },
  //搜索框失焦
  search_input_blur:function(){
    this.setData({
      inputCancel_ishide:true
    })
  },


  //“取消按钮” 清空搜索栏
  clearInput: function () {

    this.setData({
      input_val: '',
      inputCancel_ishide: true,
    })

  },

  //去商城精选
  goMall:function(){
    wx.redirectTo({
      url: '../mall/mall',
    })
  },

  //去商品详情
  goDetail: function (e) {
    wx.navigateTo({
      url: '../hintDetail/hintDetail?id=' + e.currentTarget.dataset.id,
    })
  },

  //点击两个筛选按钮时 是否显示各个筛选菜单
  showScreen:function(e){
    var isScreen=this.data.isScreen
    if (isScreen[e.currentTarget.dataset.id]==true){
      for(var i=0;i<isScreen.length;i++){
        isScreen[i]=false
      }

      this.setData({
        ishideScreen: true,
      })
    }
    else{
      for (var i = 0; i < isScreen.length; i++) {
        isScreen[i] = false
      }
      isScreen[e.currentTarget.dataset.id]=true
      if(e.currentTarget.dataset.id==0){
        this.setData({
          ishideScreen:false,
          screenId:0,
          screen_msg: price_screen
        })
      }
      else{
        this.setData({
          ishideScreen: false,
          screenId: 1,
          screen_msg: sc_screen
        })
      }
    }
    
    this.setData({
      isScreen: isScreen
    })
  },

  //点击筛选选项时事件
  selectScreen:function(e){  
    if(e.currentTarget.dataset.screenid==0){   //当screenid为0时，即价格
      var pricecover='' 
      if(e.currentTarget.dataset.id==0){      //选择的选项id为0时，即全部
      }   
      else{
        pricecover = this.data.screen_msg[e.currentTarget.dataset.id].text   //不为0时 把选取价格下的文字赋给该变量
      }
      var priceMsg = this.data.screen_msg
      for (var i = 0; i < priceMsg.length; i++) {     //把所有选项是否选中状态变为false,即不出现红色与图标
        priceMsg[i].isselect = false
      }
      priceMsg[e.currentTarget.dataset.id].isselect = true //把选择选项是否选中状态变为true,即出现红色与图标
      price_screen=priceMsg
      this.setData({
        priceCover: pricecover,
        screen_msg: priceMsg
      })
    }
    else{
      var sccover = ''
      if (e.currentTarget.dataset.id == 0) {
      }
      else {
        sccover = this.data.screen_msg[e.currentTarget.dataset.id].text
      }
      var scMsg = this.data.screen_msg
      for (var i = 0; i < scMsg.length; i++) {
        scMsg[i].isselect = false
      }
      scMsg[e.currentTarget.dataset.id].isselect = true
      sc_screen = scMsg
      this.setData({
        scCover: sccover,
        screen_msg: scMsg
      })
    }
    var isScreen = this.data.isScreen
    for (var i = 0; i < isScreen.length; i++) {
      isScreen[i] = false
    }
    this.setData({
      ishideScreen:true,
      isScreen:isScreen
    })
  },

  scroll:function(e){
    var Scrolltop = e.detail.scrollTop / e.detail.scrollHeight
    if (Scrolltop>0.122){
      this.setData({
        isfixed:true
      })
    }
    else{
      this.setData({
        isfixed: false
      })
    }
  },

  //回到顶部
  backTop:function(){
    this.setData({
      scrollTop_num:0
    })
  },

  //swiper改变时事件
  changeSwiper: function (e) {
    var swiper_block = this.data.swiper_block
    for (var i = 0; i < swiper_block.length; i++) {
      swiper_block[i] = false
    }
    swiper_block[e.detail.current] = true
    this.setData({
      swiper_block
    })
  },

  //点击轮播去专题页
  goSubject: function (e) {
    wx.navigateTo({
      url: '../subject/subject?id=' + e.currentTarget.dataset.id,
    })
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