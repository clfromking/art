// pages/raffle/raffle.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rafflecondition:'',
    order_id:0,
    inviter:0,
    source:'',
    backgroundimage:'https://pic.forunart.com/artgive/wx/gift_bg_img_2.png',
  },

  openRaffle:function(){
    var that=this
    app.islogin().then((res)=>{
      console.log(res)
      var postData={'order_id':that.data.order_id,'inviter':that.data.inviter,'client':res.data.uid}
      app.post('order/client_add',postData).then((res)=>{
        console.log(res)
        if(res.code==200||res.msg=='已参与'){
          wx.redirectTo({
            url: '../lotterydetail/lotterydetail?source='+that.data.source+'&order_id=' + that.data.order_id,
          })
        }
      }).catch((error)=>{
        console.log(error)
      })
      
    }).catch(()=>{

    })
    // console.log(1)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      order_id: options.order_id,
      order_id:138,
      source: options.source,
      inviter: options.inviter,
    })
    var that=this
    app.post('order/order_detail',{'order_id':options.order_id}).then((res)=>{
      var rafflecondition
      var backgroundimage
      if(res.code==200){
        if(Number(res.data.order.gameplaydata)==1){
          rafflecondition='礼物红包'
          backgroundimage ='https://pic.forunart.com/artgive/wx/gift_bg_img_1.png'
        }
        else if (Number(res.data.order.gameplaydata) == 2){
          rafflecondition='发起一个抽奖，'+res.data.order.condition+'开奖'
          backgroundimage = 'https://pic.forunart.com/artgive/wx/gift_bg_img_2.png'
        }
        else if (Number(res.data.order.gameplaydata) == 3){
          rafflecondition = '发起一个抽奖，满' + res.data.order.condition + '人开奖'
          backgroundimage = 'https://pic.forunart.com/artgive/wx/gift_bg_img_2.png'
        }
        that.setData({
          rafflecondition: rafflecondition,
          
          backgroundimage
        })
      }
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
    var that=this
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        var postData = { 'order_id': that.data.order_id, 'uid': res.data.uid }
        console.log(postData)
        app.post('order/client_exist', postData).then((res) => {
          if(res.data==true){
            wx.redirectTo({
              url: '../lotterydetail/lotterydetail?source='+that.data.source+'&order_id=' + that.data.order_id,
            })
          }

        }).catch((error) => {
          console.log(error)
        })
      },
      fail:function(){

      }
    })
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