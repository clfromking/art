// pages/lottery/lottery.js
const app=getApp()
let lottery_list = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lottery_list:lottery_list,  //抽奖列表
    lottery_btnText:'立即抽奖',
    banner_msgs:{},
    shareimg:''
  },

  //点击抽奖事件
  goRaffle:function(e){
    if (this.data.lottery_list[e.currentTarget.dataset.index].client==true){  
      app.addFormid()
      wx.navigateTo({
        url: '../lotterydetail/lotterydetail?source=lottery&order_id=' + this.data.lottery_list[e.currentTarget.dataset.index].id,
      })
      return
    }
    
    wx.navigateTo({
      url: '../raffle/raffle?time=' + this.data.lottery_list[e.currentTarget.dataset.index].condition + '&order_id=' + this.data.lottery_list[e.currentTarget.dataset.index].id+'&inviter=-1&source=lottery',
    })
  },

  //banner点击事件
  bannerTap:function(e){
    app.bannerGo(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    app.post('banner/lists', {'position':3}).then((res) => {
      // console.log(res)
      if (res.code == 200) {
        // console.log(res.data.business_list[0])
        that.setData({
          banner_msgs: res.data.business_list[0]
        })
      }
    }).catch((error) => {
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
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        var data = { 'uid': res.data.uid }
        app.post('order/days_lists', data).then((res) => {
          console.log(res)
          if (res.code == 200) {

            lottery_list = []
            for (var i = 0; i < res.data.lists.length; i++) {
              var lotteryObj = { 'src': res.data.lists[i].gifts[0].image, 'name': res.data.lists[i].gifts[0].name, 'alt': res.data.lists[i].gifts[0].describe, 'num': res.data.lists[i].total, 'price': res.data.lists[i].price, 'condition': res.data.lists[i].condition, 'id': res.data.lists[i].id, 'number': res.data.lists[i].number, 'client': res.data.lists[i].client }
              lottery_list.push(lotteryObj)
            }

            that.setData({
              lottery_list: lottery_list
            })
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      fail: function (res) {
        app.post('order/days_lists').then((res) => {
          if (res.code == 200) {
            console.log(res)
            lottery_list = []
            for (var i = 0; i < res.data.lists.length; i++) {
              var lotteryObj = { 'src': res.data.lists[i].gifts[0].image, 'name': res.data.lists[i].gifts[0].name, 'alt': res.data.lists[i].gifts[0].describe, 'num': res.data.lists[i].total, 'price': res.data.lists[i].price, 'condition': res.data.lists[i].condition, 'id': res.data.lists[i].id, 'number': res.data.lists[i].number, 'client': res.data.lists[i].client }
              lottery_list.push(lotteryObj)
            }

            that.setData({
              lottery_list: lottery_list
            })
          }

        }).catch((error) => {
          console.log(error)
        })
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
  onShareAppMessage: function (res) {
    let that=this,
    name = wx.getStorageSync('userInfo').username;
    return {
      title: (name ? name : "我")+"邀请您参与神马送礼的官方抽奖，请点击查看",
      imageUrl: "https://pic.forunart.com/artgive/wx/lotterybg.jpg"
    }
  },

  getFormid: function (e) {
    app.getFormid(e)
  },
})