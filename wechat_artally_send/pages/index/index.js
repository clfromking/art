// pages/index/index.js
const times = require('../../utils/util.js');  
const weekDay=["周日","周一","周二","周三","周四","周五","周六"]
let times_arr=[[],[],[]]
// let test_gift_list = [{ 'url': '../imgs/1.png', 'title': '蒙娜丽莎 雕塑', 'alt': '现代雕塑 艺术品摆件 云上弦音', 'stock': '192件', 'univalent': '200', 'num': '3' }, { 'url': '../imgs/1.png','title': '蒙娜丽莎 雕塑', 'alt': '现代雕塑 艺术品摆件 云上弦音', 'stock': '192件', 'univalent': '200', 'num': '3' }]
let gift_lists
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timesPlay:true,
    fullPlay:true,
    src:'../imgs/1.png',
    optionsText:'礼物红包',
    actionSheetHidden: true,
    actionSheetItems: [{ 'title': '礼物红包','alt':'收礼人直接领取礼物'},{'title':'限时开奖','alt':'到达指定时间，发送红包'},{'title':'人满开奖','alt':'到达人数，开奖'}],
    bless_arr: ['心想事成，好礼相赠！','真好真好真好！','哈哈哈哈哈！'],
    bless_index:0,
    bless_value:'心想事成，好礼相赠！',
    selectSheetContent:'收礼人直接领取礼物',
    times_array:times_arr,
    index:[0,0,0],
    const_time_arr:[[],[],[]],
    select_times:''||'开奖时间',
    money:'0.00',
    gift_lists:gift_lists,
    gifts_total:0
    // gift_lists:''
  },
  //显示玩法上拉类型列表
  showOptionsSheet:function(){
    this.setData({
      //取反
      actionSheetHidden: !this.data.actionSheetHidden
    });
  },

  //列表中取消事件
  listenerActionSheet:function(){
    this.setData({
      //取反
      actionSheetHidden: !this.data.actionSheetHidden
    });
  },

  //选择后改变文字事件
  changeSheetText:function(e){
    this.setData({
      optionsText: this.data.actionSheetItems[e.currentTarget.dataset.id].title,
      actionSheetHidden: !this.data.actionSheetHidden
    })
    if (e.currentTarget.dataset.id==1){  //如果选择定时开奖 执行 初始时间 判断时间
      this.load_times()
      this.setData({
        const_time_arr: times_arr,
        index:[0,0,0]
      })
      this.decideTimes()

      let now_times = new Date()
      var minutes = now_times.getMinutes().toString()

      // minutes='8'
      var houers = now_times.getHours().toString()

      if (Number(minutes) < 10) {
        minutes = '0' + minutes
      }
      if (Number(houers) < 10) {
        houers = '0' + houers
      }
      if (Number(minutes) >= 55 && Number(houers) == 23) {
        times_arr[0] = times_arr[0].slice(1)
        times_arr[1] = this.data.const_time_arr[1]
        times_arr[2] = this.data.const_time_arr[2]
      }
      this.setData({
        times_array: times_arr,
        select_times: times_arr[0][this.data.index[0]] +' '+ times_arr[1][this.data.index[1]] +':'+ times_arr[2][this.data.index[2]],
        timesPlay:false,
        fullPlay:true,
        selectSheetContent:'到达指定时间，发送红包'
      })
     
    }
    else{  //如果选择的不是限时开奖，则把选择时间的picker索引变为0
      if (e.currentTarget.dataset.id == 0){
        this.setData({
          fullPlay:true,
          timesPlay:true,
          index: [0, 0, 0],
          selectSheetContent: '收礼人直接领取礼物'
        })
      }
      else{
        this.setData({
          fullPlay: false,
          timesPlay:true,
          index: [0, 0, 0],
          selectSheetContent: '到达人数，开奖'
        })
      }
        
    }
  },


  //时间选择picker列数发生改变
  colChange: function (e) {
    var val_index = this.data.index
    switch (e.detail.column) {
      case 0:
        val_index[0] = e.detail.value
        if (e.detail.value == 0) {
          this.decideTimes()
        }
        else {
          let now_times = new Date()
          var minutes = now_times.getMinutes().toString()

          // minutes='8'
          var houers = now_times.getHours().toString()

          if (Number(minutes) < 10) {
            minutes = '0' + minutes
          }
          if (Number(houers) < 10) {
            houers = '0' + houers
          }
          if (Number(minutes) >= 55 && Number(houers) == 23) {
            times_arr[0] = this.data.const_time_arr[0].slice(1)
            times_arr[1] = this.data.const_time_arr[1].slice(0)
            times_arr[2] = this.data.const_time_arr[2].slice(0)
          }
          else {
            times_arr = this.data.const_time_arr.slice(0)
          }

        }
        val_index[1] = 0
        val_index[2] = 0
        break;
      case 1:
        val_index[1] = e.detail.value
        // console.log(this.data.index)
        if (e.detail.value == 0 && this.data.index[0] == 0) {
          // console.log(this.data.index[0])
          this.decideTimes()
        }
        else if (this.data.index[0] == 0) {
          times_arr[2] = this.data.const_time_arr[2].slice(0)
        }
        val_index[2] = 0
        break;
      case 2:
        val_index[2] = e.detail.value
        break;
    }
    this.setData({
      times_array: times_arr,
      index: val_index
    })
  },

  //点击确定后事件， 点击确定后时间才发生变化
  colConfirm: function (e) {
    this.setData({
      select_times: this.data.times_array[0][e.detail.value[0]] +' '+ this.data.times_array[1][e.detail.value[1]] +':'+ this.data.times_array[2][e.detail.value[2]]
    })
  },
  
  //确定选择祝福语
  blessConfirm:function(e){
    this.setData({
      bless_value:this.data.bless_arr[e.detail.value]
    })
  },


  //去商城挑选礼物
  goMall:function(){
    wx.navigateTo({
      url: '../mall/mall',
    })
  },

  //生成礼物红包
  makePacket:function(){
    wx.getSetting({
      success:function(res){
        console.log(res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo'] == false || res.authSetting['scope.userInfo']==undefined){
          wx.navigateTo({
            url: '../author/author',
          })
        }
        else{
          wx.getStorage({
            key: 'userInfo',
            success: function(res) {
              console.log(res.data)
            },
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.getStorage({
      key: 'gifts',
      success: function(res) {
        gift_lists=res.data
        that.setData({
          gift_lists
        })
        console.log(that.data.gift_lists)
        if(!res){

        }
      },
      fail:function(){
        console.log(1)
      }
      // complete:function(){
      //   console.log(1)
      // }
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


  //所有自定义方法

  //获取几天内的日期
  fun_date: function (aa) {
    var arr = []
    var date1 = new Date();
    var date2 = new Date(date1);
    var time2
    for (var i = 0; i < aa; i++) {
      date2.setDate(date1.getDate() + i);
      time2 = (date2.getMonth() + 1) + "-" + (date2.getDate()) + "-" + weekDay[date2.getDay()];
      arr.push(time2)
    }
    return arr
  },

  //加载时间
  load_times: function () {
    times_arr[0] = []
    times_arr[1] = []
    times_arr[2] = []
    times_arr[0] = this.fun_date(7)

    var a = 0
    for (var i = 0; i < 24; i++) {
      if (i < 10) {
        a = '0' + i
      }
      else {
        a = i.toString()
      }
      times_arr[1].push(a)

    }
    for (var i = 0; i < 60; i += 5) {
      if (i < 10) {
        a = '0' + i
      }
      else {
        a = i.toString()
      }
      times_arr[2].push(a)

    }

    // times_arr2 = times_arr.slice(0) 
    //深拷贝
  },
  //初始化时间
  decideTimes: function () {
    // console.log(this.data.const_time_arr)
    let now_times = new Date()
    var minutes = now_times.getMinutes().toString()

    // minutes='8'
    var houers = now_times.getHours().toString()

    if (Number(minutes) < 10) {
      minutes = '0' + minutes
    }
    if (Number(houers) < 10) {
      houers = '0' + houers
    }
    if (Number(minutes) >= 55 && Number(houers) == 23) {

    }
    else {
      if (Number(minutes) >= 55) {
        times_arr[2] = this.data.const_time_arr[2]
        times_arr[1] = times_arr[1].slice(times_arr[1].indexOf(houers) + 1)
      }
      else {
        if (times_arr[2].indexOf(minutes) > -1) {
          times_arr[2] = times_arr[2].slice(times_arr[2].indexOf(minutes) + 1)
        }
        else {
          times_arr[2].push(minutes);
          times_arr[2].sort();
          times_arr[2] = times_arr[2].slice(times_arr[2].indexOf(minutes) + 1)

        }
        times_arr[1] = times_arr[1].slice(times_arr[1].indexOf(houers))

      }
    }
  },


})