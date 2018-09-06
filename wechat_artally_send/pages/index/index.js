// pages/index/index.js
const times = require('../../utils/util.js');  
const weekDay=["周日","周一","周二","周三","周四","周五","周六"]
let times_arr=[[],[],[]]
// let test_gift_list = [{ 'url': '../imgs/1.png', 'title': '蒙娜丽莎 雕塑', 'alt': '现代雕塑 艺术品摆件 云上弦音', 'stock': '192件', 'univalent': '200', 'num': '3' }, { 'url': '../imgs/1.png','title': '蒙娜丽莎 雕塑', 'alt': '现代雕塑 艺术品摆件 云上弦音', 'stock': '192件', 'univalent': '200', 'num': '3' }]
let gift_lists
let uid
let openid
let isinit=false
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timesPlay:true,
    fullPlay:true,
    banner_msgs:{},
    optionsText:'礼物红包',
    actionSheetHidden: true,
    actionSheetItems: [{ 'title': '礼物红包','alt':'收礼人直接领取礼物'},{'title':'限时开奖','alt':'到达指定时间，发送红包'},{'title':'人满开奖','alt':'到达人数，开奖'}],
    bless_arr: [],
    bless_index:0,
    bless_value:'',
    selectSheetContent:'收礼人直接领取礼物',
    times_array:times_arr,
    index:[0,0,0],
    const_time_arr:[[],[],[]],
    select_times:''||'开奖时间',
    money:'0.00',
    gift_lists:gift_lists,
    gifts_total:0,
    lastTapDiffTime: 0,   //控制单双击
    ClickNum: 0,          //控制单双击
    lotteryPersonInputVal:'',   //开奖人数value
    fullPersonInputVal:'',      //满人玩法时中奖人数value
    // gift_lists:''
  },
  //显示玩法上拉类型列表
  showOptionsSheet:function(e){
    var that = this
    var curTime = e.timeStamp;
    var lastTime = this.data.lastTapDiffTime;

    if (this.data.lastTapDiffTime === 0) {
      this.setData({
        lastTapDiffTime: curTime
      })
      setTimeout(function () {
        that.clickCalculation(e)
      }, 500)
    } else {
      if (curTime - lastTime < 500) {
        this.setData({
          ClickNum: 1
        })
      }
    }
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
      bless_value:this.data.bless_arr[e.detail.value],
      bless_index: e.detail.value
    })
  },


  //开奖人数输入时事件
  lotteryPersonInput:function(e){
    if(Number(e.detail.value)>500){
      wx.showToast({
        icon:'none',
        mask:true,
        title: '开奖人数不得超过500人',
      })
      this.setData({
        lotteryPersonInputVal:500
      })
    }
  },

  //开奖人数输入失焦事件
  lotteryPersonBlur:function(e){
    // console.log(e)
    this.Trim(e.detail.value)
    if (this.Trim(e.detail.value)==''){
      this.setData({
        lotteryPersonInputVal:''
      })
      return
    }
    this.setData({
      lotteryPersonInputVal: Number(e.detail.value)
    })
  },

  //人满玩法时中奖人数失焦事件
  fullPersonInputBlur:function(e){
    if(this.Trim(e.detail.value)==''){
      this.setData({
        fullPersonInputVal:''
      })
      return
    }
    this.setData({
      fullPersonInputVal:Number(e.detail.value)
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
    if (gift_lists == undefined || gift_lists.length==0){
      wx.showToast({
        icon:'none',
        mask:true,
        title: '请先选择礼物',
      })
    }
    else{
      if (this.data.fullPlay == true && this.data.timesPlay==true){
        // console.log('礼物红包玩法')
        //验证是否登陆
        this.islogin()
        //直接支付
      }
      else if (this.data.fullPlay == false && this.data.timesPlay == true){
        // console.log('满人红包玩法')
        if (this.data.lotteryPersonInputVal == '' && this.data.lotteryPersonInputVal!==0){
          wx.showToast({
            icon: 'none',
            mask: true,
            title: '请先输入开奖人数',
          })
        }
        else if (Number(this.data.lotteryPersonInputVal)==0){
          wx.showToast({
            icon: 'none',
            mask: true,
            title: '开奖人数不能为0，请重新输入',
          })
          this.setData({
            lotteryPersonInputVal:''
          })
        }
        else{
          if (this.data.fullPersonInputVal == '' && this.data.fullPersonInputVal!==0){
            wx.showToast({
              icon: 'none',
              mask: true,
              title: '请先输入中奖人数',
            })
          }
          else if (Number(this.data.fullPersonInputVal) == 0){
            wx.showToast({
              icon: 'none',
              mask: true,
              title: '中奖人数不能为0，请重新输入',
            })
            this.setData({
              fullPersonInputVal: ''
            })
          }
          else if (Number(this.data.fullPersonInputVal) > Number(this.data.lotteryPersonInputVal)){
            wx.showToast({
              icon: 'none',
              mask: true,
              title: '中奖人数不能大于开奖人数',
            })
          }
          else if (Number(this.data.fullPersonInputVal) > Number(this.data.gifts_total)){
            wx.showToast({
              icon: 'none',
              mask: true,
              title: '中奖人数不能大于礼物数',
            })
          }
          else {
            //验证是否登陆
            this.islogin()
            //支付
          }
        }
      }
      else if (this.data.fullPlay == true && this.data.timesPlay ==false){
        // console.log('限时红包玩法')
        var selectMonth = this.data.times_array[0][this.data.index[0]]   //选中的月 日
        var selectTimes = this.data.times_array[1][this.data.index[1]] + this.data.times_array[2][this.data.index[2]]
        var date = new Date()
        var nowMonth = Number((date.getMonth() + 1).toString() + date.getDate())
        var nowTimes = Number(date.getHours().toString() + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) )
        selectMonth = Number(selectMonth.replace(/[^0-9]+/g, ''))
        selectTimes = Number(selectTimes)
        if (selectMonth>nowMonth){
          if (this.data.fullPersonInputVal == '' && this.data.fullPersonInputVal !== 0) {
            wx.showToast({
              icon: 'none',
              mask: true,
              title: '请先输入中奖人数',
            })
          }
          else if (Number(this.data.fullPersonInputVal) == 0) {
            wx.showToast({
              icon: 'none',
              mask: true,
              title: '中奖人数不能为0，请重新输入',
            })
            this.setData({
              fullPersonInputVal: ''
            })
          }
          else if (Number(this.data.fullPersonInputVal) > Number(this.data.gifts_total)) {
            wx.showToast({
              icon: 'none',
              mask: true,
              title: '中奖人数不能大于礼物数',
            })
          }
          else {
            //验证是否登陆
            this.islogin()
            //支付
          }
        }
        else if (selectMonth<=nowMonth){
          if (nowTimes>=selectTimes){
            wx.showToast({
              icon:'none',
              mask:true,
              title: '开奖时间不能小于当前时间',
            })
          }
          else{
            if (this.data.fullPersonInputVal == '' && this.data.fullPersonInputVal !== 0) {
              wx.showToast({
                icon: 'none',
                mask: true,
                title: '请先输入中奖人数',
              })
            }
            else if (Number(this.data.fullPersonInputVal) == 0) {
              wx.showToast({
                icon: 'none',
                mask: true,
                title: '中奖人数不能为0，请重新输入',
              })
              this.setData({
                fullPersonInputVal: ''
              })
            }
            else if (Number(this.data.fullPersonInputVal) > Number(this.data.gifts_total)) {
              wx.showToast({
                icon: 'none',
                mask: true,
                title: '中奖人数不能大于礼物数',
              })
            }
            else {
              //验证是否登陆
              this.islogin()
              //支付
            }
          }
        }
      }
    }
    // wx.getSetting({
    //   success:function(res){
    //     console.log(res.authSetting['scope.userInfo'])
    //     if (res.authSetting['scope.userInfo'] == false || res.authSetting['scope.userInfo']==undefined){
    //       wx.navigateTo({
    //         url: '../author/author',
    //       })
    //     }
    //     else{
    //       wx.getStorage({
    //         key: 'userInfo',
    //         success: function(res) {
    //           console.log(res.data)
    //         },
    //       })
    //     }
    //   }
    // })
  },

  //banner点击事件
  bannerTap:function(e){
    switch(e.currentTarget.dataset.go){
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        break;
    }
  },

  //祝福语聚焦事件
  blessFocus:function(e){
    this.setData({
      bless_value:''
    })
  },

  //祝福语输入事件
  blessInput:function(e){
    this.setData({
      bless_value:e.detail.value
    })
  },


  //祝福语失焦事件
  blessBlur:function(e){
    if (this.Trim(this.data.bless_value)){

    }
    else{
      // console.log(this.data.bless_index)
      this.setData({
        bless_value: this.data.bless_arr[this.data.bless_index]
      })
      
    }
  },

  

  addNum:function(e){
    gift_lists[e.currentTarget.dataset.index].num = Number(gift_lists[e.currentTarget.dataset.index].num)+1
    if (gift_lists[e.currentTarget.dataset.index].num > gift_lists[e.currentTarget.dataset.index].repertory){
      gift_lists[e.currentTarget.dataset.index].num = gift_lists[e.currentTarget.dataset.index].repertory
    }
    this.setData({
      gift_lists: gift_lists
    })
    this.giftTotal();
    this.giftTotalMoney()
  },

  subNum:function(e){
    gift_lists[e.currentTarget.dataset.index].num = Number(gift_lists[e.currentTarget.dataset.index].num) -1
    if (gift_lists[e.currentTarget.dataset.index].num <1) {
      gift_lists.splice(e.currentTarget.dataset.index,1)
    }
    // console.log(gift_lists.length)
    if(gift_lists.length==0){
      gift_lists=''
    }
    this.setData({
      gift_lists: gift_lists
    })
    this.giftTotal()
    this.giftTotalMoney()
  },

  inputNum:function(e){
    gift_lists[e.currentTarget.dataset.index].num=Number(e.detail.value)
    if (Number(e.detail.value)> gift_lists[e.currentTarget.dataset.index].repertory){
      gift_lists[e.currentTarget.dataset.index].num = gift_lists[e.currentTarget.dataset.index].repertory
    }
    else if (Number(e.detail.value)<0){
      gift_lists[e.currentTarget.dataset.index].num=1
    }
    this.setData({
      gift_lists
    })
    this.giftTotal()
    this.giftTotalMoney()
  },

  inputBlur:function(e){
    // console.log(gift_lists[e.currentTarget.dataset.index].num)
    if (gift_lists[e.currentTarget.dataset.index].num<=0){
      gift_lists.splice(e.currentTarget.dataset.index, 1)
      if (gift_lists.length == 0) {
        gift_lists = ''
      }
      this.setData({
        gift_lists
      })
      this.giftTotal()
      this.giftTotalMoney()
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    
    // console.log(gift_lists)
    var postData={'position':1}
    app.post('banner/lists',postData).then((res)=>{
      if(res.code==200){
        that.setData({
          banner_msgs : res.data.business_list[0]
        })
        
      }
    }).catch((error)=>{
      console.log(error)
    })
    app.post('order/wishlist').then((res)=>{
      if(res.code==200){
        that.setData({
          bless_arr:res.data,
          bless_value:res.data[0]
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
    // console.log(getCurrentPages())
    var that=this
    wx.getStorage({
      key: 'gifts',
      success: function (res) {
        // console.log(res)
        gift_lists = res.data
        var gifts_total=0
        
        var money = 0
        // gifts_total = that.data.gifts_total
        for (var i = 0; i < gift_lists.length; i++) {
          
          gifts_total += Number(gift_lists[i].num)
          gift_lists[i].index = i
          money += Number(gift_lists[i].num) * Number(gift_lists[i].price)
          gift_lists[i].new_repertory='库存'+gift_lists[i].repertory+'件'
        }
        that.setData({
          gift_lists: gift_lists,
          gifts_total: gifts_total,
          money: Number(money).toFixed(2)
        })
      },
      fail: function () {
        gift_lists = ''
        that.setData({
          gift_lists: gift_lists,
          gifts_total: 0,
          money: Number(0).toFixed(2)
        })
        // console.log(1)
      }

      // complete:function(){
      //   console.log(1)
      // }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log(isinit)
    if(isinit){
      this.init()
      isinit=false
    }
    // console.log(gift_lists.length)
    var that=this
    if (gift_lists == undefined||gift_lists.length == 0){
      wx.removeStorage({
        key: 'gifts',
        success: function(res) {
          // console.log(res)
          that.setData({
            gift_lists: gift_lists,
           
          })
        },
      })
    }
    else{
      wx.setStorage({
        key: 'gifts',
        data: gift_lists,
        success:function(res){
          // console.log(res)
          that.setData({
            gift_lists
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // console.log('销毁')
    
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
      time2 = date2.getFullYear()+'-'+(date2.getMonth() + 1) + "-" + (date2.getDate()) + "-" + weekDay[date2.getDay()];
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


  //去空格
  Trim:function(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },

  //控制单双击事件
  clickCalculation: function (e) {
    if (this.data.ClickNum === 0) {
      // console.log("单击")
      this.setData({
        lastTapDiffTime: 0,
        ClickNum: 0,
        actionSheetHidden: !this.data.actionSheetHidden
        
      })
    } else {
      // console.log("双击")
      this.setData({
        lastTapDiffTime: 0,
        ClickNum: 0
      })
    }
  },



  preventMove:function(){

  },

  //计算礼物总数
  giftTotal: function () {
    var giftTotal = 0
    for (var i = 0; i < gift_lists.length; i++) {
      giftTotal += Number(gift_lists[i].num)
    }
    this.setData({
      gifts_total: giftTotal
    })
  },

  //计算礼物总价钱
  giftTotalMoney:function(){
    var money = 0
    for (var i = 0; i < gift_lists.length; i++) {
      money += Number(gift_lists[i].num) * Number(gift_lists[i].price)
    }
    this.setData({
      money:Number(money).toFixed(2)
    })
  },



  //是否登陆过
  islogin:function(){
    var that=this
    app.islogin().then((res) => {
      // console.log(res)
      uid = res.data.uid
      openid = res.data.openid
      // console.log(res)
      that.addOrder()
    }).catch((res) => {
      // console.log(res)
    })
  },

  //生成订单
  addOrder:function(){
    console.log(gift_lists)
    for(var i=0;i<gift_lists.length;i++){
      if(Number(gift_lists[i].num)==0&&Number(gift_lists[i].repertory)==0){
        wx.showToast({
          icon:'none',
          mask:true,
          duration:2000,
          title: '您所选择的某种商品库存为零，请手动清除',
        })
        return
      }
    }
    var condition
    var play
    var goods_ids = []
    var goods_nums = []
    var goods_id
    var goods_num
    wx.showLoading({
      title: '生成订单',
      mask:true
    })
    for (var i = 0; i < gift_lists.length; i++) {
      goods_ids.push(gift_lists[i].id)
      goods_nums.push(gift_lists[i].num)
    }
    goods_id = goods_ids.join(',')
    goods_num = goods_nums.join(',')
    if (this.data.fullPlay == true && this.data.timesPlay == true) {
      condition = ''
      play = 1
    }
    else if (this.data.fullPlay == false && this.data.timesPlay == true) {
      condition = this.data.lotteryPersonInputVal
      play = 3
    }
    else if (this.data.fullPlay == true && this.data.timesPlay == false) {
      condition = this.data.select_times
      
      condition=condition.split(' ')
      var a=condition[0]
      a=a.split('-')
      a.pop()
      
      condition = a.join('-') + ' ' + condition[1]
      play = 2
    }
    var that=this
    var postData = { 'uid': uid, 'gameplaydata': play, 'condition': condition, 'wish': this.data.bless_value, 'goods_id': goods_id, 'goods_num': goods_num }
    app.post('order/order_add', postData).then((res) => {
      console.log(res)
      if (res.code == 200) {
        that.Pay(res.data.order_id,res.data.number)
      }
      else if(res.code==600){
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: res.msg,
        })
      }
      else if(res.code==601){
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: res.msg,
        })
        console.log(gift_lists)
        for(var i=0;i<res.data.repertory.length;i++){
          for(var j=0;j<gift_lists.length;j++){
            if(res.data.repertory[i].id==gift_lists[j].id){
              gift_lists[j].repertory=res.data.repertory[i].repertory
              gift_lists[j].num = res.data.repertory[i].repertory
              gift_lists[j].new_repertory = '库存'+res.data.repertory[i].repertory+'件'
              gift_lists.unshift(gift_lists.splice(j, 1)[0])
              console.log(gift_lists)
              // console.log(gift_lists.splice(j, 1))
              // console.log(gift_lists)
              // gift_lists.splice(j,1)
            }
            console.log(j)
            console.log(gift_lists[j].num)
          }
        }
        var gifts_total=0
        var money=0
        for (var i = 0; i < gift_lists.length;i++){
          gifts_total += Number(gift_lists[i].num)
          money += Number(gift_lists[i].num) * Number(gift_lists[i].price)
        }
        if(Number(money)==0){
          money=Number(0).toFixed(2)
        }
        else{
          money=Number(money).toFixed(2)
        }
        that.setData({
          gift_lists,
          gifts_total,
          money
        })
        
      }
    }).catch((error) => {
      wx.hideLoading()
      wx.showToast({
        icon:'none',
        title: '生成订单失败，请重试',
      })
      console.log(error)
    })
  },

  //支付
  Pay:function(order_id,num){
    wx.navigateTo({
      url: '../lotterydetail/lotterydetail?source=lottery&order_id=' + order_id,
    })
    return
    console.log(uid)
    console.log(openid)
    console.log(num)
    var that=this
    var postData={'uid':uid,'openid':openid,'order_sn':num}
    app.post('wxpay/wxgiftjspayRequest',postData).then((res)=>{
      console.log(res)
      if(res.code==200){
        
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success:function(res){
            console.log(res)
            wx.hideLoading()
            isinit = true

            wx.navigateTo({
              url: '../lotterydetail/lotterydetail?source=index&order_id=' + order_id,
            })
          },
          fail:function(res){
            console.log(res)
            wx.showToast({
              icon:'none',
              title: '支付失败',
            })
            app.post('wxpay/wxpaycloes', { 'order_sn': num}).then((res)=>{
              console.log(res)
            }).catch((error)=>{
              console.log(error)
            })
          }
        })
      }
      else if(res.code==600){
        wx.showToast({
          icon: 'none',
          title: res.msg,
        })
      }
      
    }).catch((error)=>{
      wx.hideLoading()
      wx.showToast({
        icon: 'none',
        title: '支付发起失败，请重试',
      })
      console.log(error)
    })
  },


  //付款之后跳转到状态
  afterBuy: function () {
    // console.log(msg)
    
  },

  //初始化所有
  init:function(){
    gift_lists=''
    this.setData({
      timesPlay: true,
      fullPlay: true,
      optionsText: '礼物红包',
      bless_index: 0,
      bless_value: this.data.bless_arr[0],
      selectSheetContent: '收礼人直接领取礼物',
      times_array: times_arr,
      index: [0, 0, 0],
      const_time_arr: [[], [], []],
      select_times: '' || '开奖时间',
      money: '0.00',
      gift_lists: gift_lists,
      gifts_total: 0,
      lastTapDiffTime: 0,   //控制单双击
      ClickNum: 0,          //控制单双击
      lotteryPersonInputVal: '',   //开奖人数value
      fullPersonInputVal: '',      //满人玩法时中奖人数value

    })
  }

})