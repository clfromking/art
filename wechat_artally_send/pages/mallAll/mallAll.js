// pages/mallAll/mallAll.js
const app=getApp()
let ware_list = []
let price_screen = []
let sc_screen = []
const Rpx = 750 / wx.getSystemInfoSync().windowWidth
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner_src: [],   //banner图src
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
    swiper_block: [],
    select_name1:'',  //第一类类名
    select_name2: '',  //第二类类名
    select_id1:0,   //点击的第一类选项id
    select_id2: 0,   //点击的第二类选项id
    swiper_block_width: ''

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
  //搜索框输入
  search_input: function (e) {
    this.setData({
      input_val: e.detail.value
    })
  },

  //点击搜索
  search_msg: function () {
    var data = { 'price': this.data.select_id1, 'sort': this.data.select_id2, 'search': this.data.input_val }
    var that = this
    app.post('gifts/lists', data).then((res) => {
      console.log(res)
      if (res.code == 200) {
        ware_list = res.data.lists
        that.setData({
          ware_list
        })
      }
    }).catch((error) => {
      console.log(error)
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
    var e_id=e.currentTarget.dataset.id
    // console.log(e_id)
    if(e.currentTarget.dataset.screenid==0){   //当screenid为0时，即价格
      var pricecover='' 
      if(e.currentTarget.dataset.id==0){      //选择的选项id为0时，即全部
      }   
      else{
        pricecover = this.data.screen_msg[e.currentTarget.dataset.id].name   //不为0时 把选取价格下的文字赋给该变量
      }
      var priceMsg = this.data.screen_msg
      for (var i = 0; i < priceMsg.length; i++) {     //把所有选项是否选中状态变为false,即不出现红色与图标
        priceMsg[i].isselect = false
      }
      priceMsg[e.currentTarget.dataset.id].isselect = true //把选择选项是否选中状态变为true,即出现红色与图标
      price_screen=priceMsg
      this.setData({
        priceCover: pricecover,
        screen_msg: priceMsg,
        select_id1:e_id
      })
    }
    else{
      var sccover = ''
      if (e.currentTarget.dataset.id == 0) {
      }
      else {
        sccover = this.data.screen_msg[e.currentTarget.dataset.id].name
      }
      var scMsg = this.data.screen_msg
      for (var i = 0; i < scMsg.length; i++) {
        scMsg[i].isselect = false
      }
      scMsg[e.currentTarget.dataset.id].isselect = true
      sc_screen = scMsg
      this.setData({
        scCover: sccover,
        screen_msg: scMsg,
        select_id2: e_id
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
    var data = { 'price': this.data.select_id1, 'sort': this.data.select_id2,'search':this.data.input_val}
    var that=this
    app.post('gifts/lists',data).then((res)=>{
      console.log(res)
      if(res.code== 200){
        ware_list = res.data.lists
        that.setData({
          ware_list
        })
      }
    }).catch((error)=>{
      console.log(error)
    })
  },

  scroll:function(e){
    var Scrolltop = Number(e.detail.scrollTop) * Number(Rpx)
    if (Scrolltop>=310&&this.data.isfixed==false){
      this.setData({
        isfixed:true
      })
    }
    else if (Scrolltop < 310 && this.data.isfixed == true){
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
    switch (Number(e.currentTarget.dataset.go)) {
      case 1:
        break;
      case 2:
        wx.reLaunch({
          url: '../index/index',
        })
        break;
      case 3:
        wx.navigateTo({
          url: '../hintDetail/hintDetail?id=' + e.currentTarget.dataset.go_id,
        })
        break;
      case 4:
        wx.navigateTo({
          url: '../raffle/raffle?id=' + e.currentTarget.dataset.go_id,
        })
        break;
      case 5:
        wx.navigateTo({
          url: '../subject/subject?id=' + e.currentTarget.dataset.go_id,
        })
        break;
      case 6:
        break;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    //加载banner
    app.post('banner/lists', { 'position': 2 }).then((res) => {
      console.log(res)
      var swiper_block=[]
      if (res.code == 200) {
        for (var i = 0; i < res.data.business_list.length; i++) {
          if (i == 0) {
            swiper_block[i] = true
          }
          else {
            swiper_block[i] = false
          }
        }

        that.setData({
          banner_src: res.data.business_list,
          swiper_block: swiper_block,
          swiper_block_width: 15 * res.data.business_list.length + 20 * (res.data.business_list.length - 1) + 1 + 'rpx'
        })
      }
    }).catch((error) => {
      console.log(error)
    })

    //加载全部列表
    var data = { "hot": 0 }
    app.post('gifts/lists', data).then((res) => {
      if (res.code == 200) {
        ware_list = res.data.lists
        that.setData({
          ware_list
        })

      }
    }).catch((error) => {
      console.log(error)
    })

    //加载下拉选项数据
    app.post('gifts/types').then((res)=>{
      console.log(res)
      if(res.code==200){
        price_screen=res.data[0].children
        sc_screen=res.data[1].children
        for(var i=0;i<price_screen.length;i++){
          if(i==0){
            price_screen[0].isselect=true
            sc_screen[0].isselect=true
          }
          else{
            price_screen[i].isselect = false
            sc_screen[i].isselect = false
          }
        }
        that.setData({
          select_name1: res.data[0].name,
          select_name2: res.data[1].name,
        })
      }
    }).catch((error)=>{
      console.log(error)
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
  
  },

  
  getFormid: function (e) {

    app.data.formIds.push(e.detail.formId)
    console.log(app.data.formIds)
  },
})