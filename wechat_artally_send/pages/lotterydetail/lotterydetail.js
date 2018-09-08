// pages/lotterydetail/lotterydetail.js\
const app=getApp()
let gift_detail={}
let uid
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gifts:[
    ],
    heads:[
    ],
    currentSwiper:0,
    sharelist:["分享给朋友","分享到朋友圈"],
    notShare:true,
    title_text:'',
    condition:'',
    other_text:'邀请好友参与抽奖，提高中奖几率',
    bless:'恭喜发财，大吉大利',
    isfinish:false,
    gift_detail: gift_detail,
    uid:0,
    ishowSpebtn:false,
    ishowodds:false,
    ishowodds1:false,
    winList:[],
    ishave:false,
    ismy:false,
    ismyOneContinue:false,
    ismyBtntext:'还要送礼物',
    ismy2haveBtntext:'邀请好友抽奖',
    isreceivePerson:false,
    isshowWhite:true
  },
  // 轮播改变事件
  swiperchange:function(e){
    let val = e.detail.current;
    this.setData({
      currentSwiper: val
    })
  },
  // 分享按钮
  share:function(){
    let notShare = this.data.notShare;
    this.setData({
      notShare: !notShare
    })
  },
  // 分享选项选择
  shareChange:function(e){
    let val=e.currentTarget.dataset.index;
    //val==0分享朋友,val==1分享朋友圈
    if(val==0){

    }else if(val==1){

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // app.post('order/client_add', { 'order_id': 69, 'inviter':20,'client':7}).then((res)=>{
    //   console.log(res)
    //   app.post('order/order_detail', { 'order_id': '69', 'uid': '7' }).then((res) => {
    //     console.log(res)
    //   })
    // })
    // return
    try {
      var res = wx.getStorageSync('userInfo')
      uid=res.uid
      // console.log(res)
    } catch (e) {

    }
    var that=this
    var isshowWhite = false
    var title_text='礼物已经准备完毕，送出去吧'
    console.log(options)
    // options.source='lottery'
    if(options.source=='index'){
      app.post('order/order_detail', { 'order_id': options.order_id }).then((res) => {
        console.log(res)
        if (res.code == 200) {
          gift_detail = res.data.order
          switch (Number(gift_detail.gameplaydata)) {
            case 2:
              gift_detail.condition = gift_detail.condition + '开奖'
              break;
            case 3:
              gift_detail.condition = '满' + gift_detail.condition + '人开奖'
              break;
            default:
              gift_detail.condition = '礼物红包'
              break;
          }

          that.setData({
            ishowodds: true,
            ishowodds1: true,
            gift_detail: gift_detail,
            gifts: gift_detail.gifts,
            title_text,
            uid: uid,
            isshowWhite
          })
        }
      }).catch((error) => {
        console.log(error)
      })
      
    }
    else if(options.source=='lottery'){
      var postData = { 'order_id': options.order_id, 'uid': uid }
      // postData={'order_id':149,'uid':77}
      app.post('order/order_detail', postData).then((res) => {
        console.log(res)
        if (res.code == 200) {
          var gift_detail = res.data.order
          var title_text
          var ishowSpebtn = false
          var ishowodds = false
          var isfinish = false
          var ishave = false
          var ishowodds1=false
          var other_text = that.data.other_text
          if (Number(gift_detail.giftbagdata) == 1) {
            title_text = '请等待，成功参与抽奖'
          }
          else if (Number(gift_detail.giftbagdata) == 2) {
            title_text = '很遗憾，您未抽中大奖'
            switch (Number(gift_detail.status)) {
              case 0:
                title_text = '很遗憾，礼物已经过期'
                isfinish = false
                ishowodds = true
                ishowodds1=true
                ishowSpebtn = true
                break;
              case 1:
                break;
              case 2:
                title_text = '恭喜您，您已抽中大奖'
                other_text = ''
                ishowSpebtn = true
                isfinish = true
                ishave = true
                break;
              case 3:
                title_text = '很遗憾，您没有抽中大奖'
                other_text = ''
                ishowSpebtn = true
                isfinish = true
                break;
            }
          }
          else if (Number(gift_detail.giftbagdata) == 3) {
            title_text = '很遗憾，礼物已经过期'
            ishowodds = true
            ishowodds1=true
            isfinish = false
            ishowSpebtn = true
          }

          switch (Number(gift_detail.gameplaydata)) {
            case 2:
              gift_detail.condition = gift_detail.condition + '开奖'
              break;
            case 3:
              gift_detail.condition = '满' + gift_detail.condition + '人开奖'
              break;
            default:
              gift_detail.condition = '礼物红包'
              if (Number(gift_detail.status) == 0) {
                title_text = '很遗憾，礼物已经抢光'
                // ishowSpebtn = true
              }
              else if (Number(gift_detail.status) == 2) {
                title_text = '礼物已经领取，好开心'
                ishowSpebtn = true
                ishowodds = true
                ishowodds1=true
                ishave = true
              }

              break;
          }
          if (!gift_detail.wish) {
            gift_detail.wish = ''
          }

          gift_detail.inviter_count = Number(gift_detail.inviter_count)
          console.log(gift_detail)
          that.setData({
            gift_detail: gift_detail,
            gifts: gift_detail.gifts,
            title_text,
            heads: gift_detail.client,
            uid: uid,
            ishowSpebtn,
            ishowodds,
            ishowodds1,
            isfinish,
            other_text,
            winList: gift_detail.win || '',
            ishave,
            isshowWhite
          })

        }
      }).catch((error) => {
        console.log(error)
      })
    }
    else if(options.source=='my'){
      console.log(options.type)
      var postData={}
      var that=this
      if(options.type==1){
        postData = { 'order_id': options.order_id }
        app.post('order/order_detail', postData).then((res) => {
          console.log(res)
          if(res.code==200){
            var title_text=''
            var condition=''
            var ishowodds=false
            var ishowodds1=false
            var isfinish=false
            var ismy=true
            var ismyOneContinue=false
            var gift_detail = res.data.order
            if (Number(gift_detail.gameplaydata)==1) {     //点对点
              if (Number(gift_detail.giftbagdata)==1){    //进行中
                title_text ='礼物等待领取，莫着急'
                gift_detail.condition = '礼物红包'
                ishowodds=true
                ishowodds1=true
                ismyOneContinue = false
              }
              else if (Number(gift_detail.giftbagdata) == 2){    //已完成
                title_text = '礼物已被领取，好开心'
                gift_detail.condition = '礼物红包'
                ishowodds = true
                ishowodds1=true
                isfinish=true
                ismyOneContinue=true
              }
              else if (Number(gift_detail.giftbagdata) == 3){    //已过期
                title_text = '礼物无人领取，已过期'
                gift_detail.condition = '礼物红包(已为您安排退款)'
                ishowodds = true
                ishowodds1=true
                ismyOneContinue = true
              }
            }
            else if (Number(gift_detail.gameplaydata)==2){   //定时
              if (Number(gift_detail.giftbagdata) == 1) {    //进行中
                title_text ='礼物等待开奖，莫着急'
                gift_detail.condition = gift_detail.condition + '开奖'
                ishowodds=true
                ishowodds1=false
              }
              else if (Number(gift_detail.giftbagdata) == 2) {    //已完成
                title_text ='礼物已经抢光，好开心' 
                gift_detail.condition = gift_detail.condition+'开奖'
                ishowodds=true
                ishowodds1=false
                isfinish=true
                ismyOneContinue=true
              }
              else if (Number(gift_detail.giftbagdata) == 3) {    //已过期
                title_text ='抽奖无人参与，已过期'
                gift_detail.condition = gift_detail.condition + '开奖(已为您安排退款)'
                ishowodds = true
                ishowodds1 = false
                ismyOneContinue = true
              }
            }
            else{     //满人
              if (Number(gift_detail.giftbagdata) == 1) {    //进行中
                title_text ='礼物等待开奖，莫着急'
                gift_detail.condition = '满'+gift_detail.condition+'人开奖'
                ishowodds=true
                ishowodds1=false
                
              }
              else if (Number(gift_detail.giftbagdata) == 2) {    //已完成
                title_text = '礼物已被抢光，好开心'
                gift_detail.condition = '满' + gift_detail.condition + '人开奖'
                ishowodds = true
                ishowodds1 = false
                isfinish=true
                ismyOneContinue=true
              }
              else if (Number(gift_detail.giftbagdata) == 3) {    //已过期
                title_text = '抽奖参与未满，已过期'
                gift_detail.condition = '满' + gift_detail.condition + '人开奖(已为您安排退款)'
                ishowodds = true
                ishowodds1 = false
                ismyOneContinue = true
              }
            }
            that.setData({
              title_text,
              gift_detail,
              ishowodds,
              ishowodds1,
              gifts: gift_detail.gifts,
              winList: gift_detail.win || '',
              isfinish,
              ismy,
              ismyOneContinue,
              heads: gift_detail.client,
              isshowWhite
            })
            
          }
          
        }).catch((error) => {
          console.log(error)
        })
      }
      else{
        postData = { 'order_id': options.order_id,'uid':uid }
        app.post('order/order_detail',postData).then((res)=>{
          console.log(res)
          if(res.code==200){
            var title_text = ''
            var condition = ''
            var ishowodds = false
            var ishowodds1 = false
            var isfinish = false
            var ismy = true
            var ishave=false
            var ismyOneContinue = false
            var isreceivePerson = that.data.isreceivePerson
            var ismyBtntext = that.data.ismyBtntext
            var gift_detail = res.data.order
            var other_text = that.data.other_text
            var ismy2haveBtntext = that.data.ismy2haveBtntext
            var ishowSpebtn=false
            if (Number(gift_detail.gameplaydata) == 1){     //点对点
              if (Number(gift_detail.giftbagdata) == 1){    //进行中
                
              }
              else if (Number(gift_detail.giftbagdata) == 2){   //已完成
                title_text ='已经礼物领取，好开心'
                gift_detail.condition='礼物红包'
                ishowodds=true
                ishowodds1=true
                isfinish=true
                ismyBtntext='我也要送礼物'
                ismyOneContinue=true,
                isreceivePerson=true
                ishave=true
              }
              else if (Number(gift_detail.giftbagdata) == 3){     //已过期

              }
            }
            else if (Number(gift_detail.gameplaydata) == 2){    //定时
              gift_detail.wish = gift_detail.wish || ''
              ismy=false
              gift_detail.condition = gift_detail.condition + '开奖'
              if (Number(gift_detail.giftbagdata) == 1) {    //进行中
                title_text='请等待，成功参与抽奖'
              }
              else if (Number(gift_detail.giftbagdata) == 2) {   //已完成
                isfinish=true
                other_text=''
                switch(Number(gift_detail.status)){
                  case 2:
                    title_text ='恭喜您，您已抽中大奖'
                    ishave=true
                    ismy2haveBtntext='分享给好友'
                    break;
                  case 3:
                    title_text ='很遗憾，您未抽中大奖'
                    ishowSpebtn=true
                    break;
                }
                
               
              }
              else if (Number(gift_detail.giftbagdata) == 3) {     //已过期
                // title_text = '请等待，成功参与抽奖'
              }
            }
            else if (Number(gift_detail.gameplaydata) == 3){    //满人
              gift_detail.wish = gift_detail.wish || ''
              ismy = false
              gift_detail.condition = '满'+gift_detail.condition + '人开奖'
              if (Number(gift_detail.giftbagdata) == 1) {    //进行中
                title_text ='请等待，成功参与抽奖'
              }
              else if (Number(gift_detail.giftbagdata) == 2) {   //已完成
                other_text=''
                isfinish=true
                switch(Number(gift_detail.status)){
                  case 2:
                    ishave=true
                    title_text='恭喜您，您已抽中大奖'
                    ismy2haveBtntext='分享给好友'
                    break;
                  case 3:
                    title_text = '很遗憾，您未抽中大奖'
                    ishowSpebtn=true
                    break;
                }
              }
              else if (Number(gift_detail.giftbagdata) == 3) {     //已过期
                title_text = '很遗憾，礼物已经过期'
                ishowSpebtn=true
                other_text = ''
                ishowodds=true
                ishowodds1=true
              }
            }
            that.setData({
              title_text,
              gift_detail,
              ishowodds,
              ishowodds1,
              gifts: gift_detail.gifts,
              winList: gift_detail.win || '',
              isfinish,
              ismy,
              ismyOneContinue,
              heads: gift_detail.client,
              ismyBtntext,
              isreceivePerson,
              ishave,
              other_text,
              ismy2haveBtntext,
              ishowSpebtn,
              isshowWhite
            })

          }
        }).catch((error)=>{
          console.log(error)
        })
      }
      console.log(postData)
      
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
  onShareAppMessage: function (res) {
    console.log(this.data.gift_detail.condition)
    console.log(this.data.gift_detail.id)
    console.log(this.data.gift_detail.author_id)
    var source='lottery'
    // if (Number(this.data.gift_detail.author_id)==-1){
    //   source='lottery'
    // }
    // else{
    //   source='personalLaunch'
    // }
    if(res.from=='button'){

    }
    else{

    }
    return {
      title:'快来帮忙',
      path: 'pages/raffle/raffle?time=' + this.data.gift_detail.condition + '&order_id=' + this.data.gift_detail.id+'&inviter='+uid+'&source=lottery'
    }
  },


  //去首页||我也要送礼
  goIndex:function(){
    wx.reLaunch({
      url: '../index/index',
    })
  },

  //参与更多抽奖||去官网抽奖页
  joinMore:function(){
    wx.reLaunch({
      url: '../lottery/lottery',
    })
  },
  

  //去礼物栏查看
  goMy:function(){
    wx.switchTab({
      url: '../my/my',
    })
  },
  
  a:function(){}
})