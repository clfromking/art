// pages/lotterydetail/lotterydetail.js\
const app=getApp()
let gift_detail={}
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
    isindex:false,
    isfinish:false,
    gift_detail: gift_detail,
    uid:0,
    isoneTone:false
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
    var that=this
    var title_text='礼物已经准备完毕，送出去吧'
    console.log(options)
    if(options.source=='index'){
      wx.getStorage({
        key: 'userInfo',
        success: function(resp) {
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
                isindex: true,
                gift_detail: gift_detail,
                gifts: gift_detail.gifts,
                title_text,
                uid:resp.data.uid
          })
              console.log(gift_detail)
            }
          }).catch((error) => {
            console.log(error)
          })
        },
      })
      
    }
    else if(options.source=='lottery'){
      wx.getStorage({
        key: 'userInfo',
        success: function(resp) {
          var postData = { 'order_id': options.order_id, 'uid':resp.data.uid}
          // postData={'order_id':9,'uid':50}
          app.post('order/order_detail',postData).then((res) => {
            console.log(res)
            if(res.code==200){
              var gift_detail=res.data.order
              var title_text
              var isoneTone=false
              var isindex=false
              if (Number(gift_detail.giftbagdata)==1){
                title_text='抽奖成功，等待开奖'
              }
              else if (Number(gift_detail.giftbagdata)==2){
                title_text='很遗憾，您未抽中大奖'
              }
              else if (Number(gift_detail.giftbagdata)==3){
                title_text='该礼物红包已过期'
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
                  title_text='礼物已经领取，好开心'
                  isoneTone=true
                  isindex=true
                  break;
              }
              if(!gift_detail.wish){
                gift_detail.wish=''
              }
              gift_detail.inviter_count = Number(gift_detail.inviter_count)
              console.log(gift_detail)
              that.setData({
                gift_detail: gift_detail,
                gifts: gift_detail.gifts,
                title_text,
                heads:gift_detail.client,
                uid:resp.data.uid,
                isoneTone,
                isindex
              })

            }
          }).catch((error) => {
            console.log(error)
          })
        },
      })
    }
    else if(options.source=='personalLaunch'){

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
      path: 'pages/raffle/raffle?time=' + this.data.gift_detail.condition + '&order_id=' + this.data.gift_detail.id+'&inviter='+this.data.uid+'&source=lottery'
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

  
  a:function(){}
})