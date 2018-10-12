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
    shareimg:'',
    isnothing:true
  },

  //点击抽奖事件
  goRaffle:function(e){
    console.log(e)
    if(e.currentTarget.dataset.join_status==0){
      wx.showToast({
        title: '您所参与的抽奖尚未开始，敬请期待！',
        icon:'none',
        mask:true
      })
      return
    }
    let index = e.currentTarget.dataset.index,
      id = e.currentTarget.dataset.id;
    if (this.data.lottery_list[index].client==true){
      app.addFormid()
      wx.navigateTo({
        url: '../lotterydetail/lotterydetail?source=lottery&order_id=' + id,
      })
      return
    }
    
    wx.navigateTo({
      url: '../raffle/raffle?order_id=' +id+'&inviter=-1&source=lottery',
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
    this.loadLottery()
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
    this.loadLottery()
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
      imageUrl: "https://pic.forunart.com/artgive/wx/lotterybg1.jpg"
    }
  },

  getFormid: function (e) {
    app.getFormid(e)
  },


  //加载官方抽奖信息
  loadLottery:function(){
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        var data = { 'uid': res.data.uid }
        app.post('order/days_lists', data).then((res) => {
          console.log(res)
          if (res.code == 200) {

            lottery_list = []
            if (res.data.lists.length <= 0) {
              that.setData({
                isnothing: false
              })
            }
            else {
              that.setData({
                isnothing: true
              })
            }
            // console.log(res.data.lists.length)
            // console.log(that.data.isnothing)
            for (var i = 0; i < res.data.lists.length; i++) {
              var lotteryObj = { 'src': res.data.lists[i].image ? res.data.lists[i].image : res.data.lists[i].gifts[0].image, 'name': res.data.lists[i].gifts[0].name, 'alt': res.data.lists[i].gifts[0].describe, 'num': res.data.lists[i].total, 'price': res.data.lists[i].price, 'condition': res.data.lists[i].condition, 'id': res.data.lists[i].id, 'number': res.data.lists[i].number, 'client': res.data.lists[i].client,'join_status':res.data.lists[i].join_status,'join_time':res.data.lists[i].join_time }
              lottery_list.push(lotteryObj)
            }

            that.setData({
              lottery_list: lottery_list
            })
            wx.stopPullDownRefresh()
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
            if (res.data.lists.length <= 0) {
              that.setData({
                isnothing: false
              })
            }
            else {
              that.setData({
                isnothing: true
              })
            }
            // console.log(res.data.lists.length)
            // console.log(that.data.isnothing)
            for (var i = 0; i < res.data.lists.length; i++) {
              var lotteryObj = { 'src': res.data.lists[i].image ? res.data.lists[i].image : res.data.lists[i].gifts[0].image, 'name': res.data.lists[i].gifts[0].name, 'alt': res.data.lists[i].gifts[0].describe, 'num': res.data.lists[i].total, 'price': res.data.lists[i].price, 'condition': res.data.lists[i].condition, 'id': res.data.lists[i].id, 'number': res.data.lists[i].number, 'client': res.data.lists[i].client, 'join_status': res.data.lists[i].join_status, 'join_time': res.data.lists[i].join_time}
              lottery_list.push(lotteryObj)
            }

            that.setData({
              lottery_list: lottery_list
            })
            wx.stopPullDownRefresh()
          }

        }).catch((error) => {
          console.log(error)
        })
      }
    })
  },


})