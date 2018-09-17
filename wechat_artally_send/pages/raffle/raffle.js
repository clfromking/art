// pages/raffle/raffle.js
const app=getApp()
let order_id=0
let inviter
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
    isshowWhite:true,
    name:'',
    avatar:'',
    wish:''
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

    if(options.scene){
      var scene = decodeURIComponent(options.scene)
      scene=scene.split(',')
      // console.log(scene)
      order_id=scene[1]
      inviter=scene[2]
      this.setData({
        order_id,
        source: scene[0],
        inviter,
      })
     
    }
    else{
      order_id = options.order_id
      inviter = options.inviter
      this.setData({
        order_id,
        // order_id:149,
        source: options.source,
        inviter,
      })
    }
    var that=this
    
    setTimeout(function(){
      console.log('order_id' + order_id)
      app.post('order/order_detail', { 'order_id': that.data.order_id }).then((res) => {
        var rafflecondition
        var backgroundimage
        console.log(res)
        if (res.code == 200) {
          console.log(res)
          if (Number(res.data.order.gameplaydata) == 1) {
            rafflecondition = '礼物红包'
            backgroundimage = 'https://pic.forunart.com/artgive/wx/gift_bg_img_1.png'
          }
          else if (Number(res.data.order.gameplaydata) == 2) {
            rafflecondition = '发起一个抽奖，' + res.data.order.condition + '开奖'
            backgroundimage = 'https://pic.forunart.com/artgive/wx/gift_bg_img_2.png'
          }
          else if (Number(res.data.order.gameplaydata) == 3) {
            rafflecondition = '发起一个抽奖，满' + res.data.order.condition + '人开奖'
            backgroundimage = 'https://pic.forunart.com/artgive/wx/gift_bg_img_2.png'
          }
          that.setData({
            rafflecondition: rafflecondition,
            backgroundimage,
            name: res.data.order.uname,
            avatar: res.data.order.avatar,
            wish: res.data.order.wish ? res.data.order.wish : '恭喜发财，大吉大利。'
          })
        }
      })
    },0)
   
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
    setTimeout(function(){
      wx.getStorage({
        key: 'userInfo',
        success: function (res) {
          console.log(that.data.order_id)
          var postData = { 'order_id': that.data.order_id, 'uid': res.data.uid }
          console.log(postData)
          app.post('order/client_exist', postData).then((res) => {
            if (res.data == true) {
              console.log(that.data.isshowWhite)
              app.addFormid()
              wx.redirectTo({
                url: '../lotterydetail/lotterydetail?source=' + that.data.source + '&order_id=' + that.data.order_id,
              })
            }
            else {
              that.setData({
                isshowWhite: false
              })
            }

          }).catch((error) => {
            console.log(error)
          })
        },
        fail: function () {
          // console.log(11)
          that.setData({
            isshowWhite: false
          })
        }
      })
    },500)
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      isshowWhite:true
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({
      isshowWhite: true
    })
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
    app.getFormid(e)
  },
})