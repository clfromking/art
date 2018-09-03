// pages/lotterydetail/lotterydetail.js\
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gifts:[
      {
        id: '1',
        img: 'https://pic.forunart.com/artgive/wx/mall_banner_img.png',
        name: '凤飞飞'
      },
      {
        id: '2',
        img: 'https://pic.forunart.com/artgive/wx/mall_banner_img.png',
        name: '凤飞飞2'
      },
      {
        id: '3',
        img: 'https://pic.forunart.com/artgive/wx/mall_banner_img.png',
        name: '凤飞飞3'
      }
      
    ],
    heads:[
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      "https://pic.forunart.com/artgive/wx/mall_label_birthday.png",
      
    ],
    currentSwiper:0,
    sharelist:["分享给朋友","分享到朋友圈"],
    notShare:true
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
    console.log(options)
    if(options.source=='index'){
      console.log(options.order_id)
      app.post('order/order_detail', {'order_id':options.order_id}).then((res)=>{
        console.log(res)
      }).catch((error)=>{
        console.log(error)
      })
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
  onShareAppMessage: function () {
  
  }
})