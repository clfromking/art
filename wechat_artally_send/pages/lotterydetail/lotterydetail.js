// pages/lotterydetail/lotterydetail.js\
const app=getApp()
let gift_detail={}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gifts:[
      {
        id: '1',
        image: 'https://pic.forunart.com/artgive/wx/mall_banner_img.png',
        name: '凤飞飞'
      },
      {
        id: '2',
        image: 'https://pic.forunart.com/artgive/wx/mall_banner_img.png',
        name: '凤飞飞2'
      },
      {
        id: '3',
        image: 'https://pic.forunart.com/artgive/wx/mall_banner_img.png',
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
    notShare:true,
    title_text:'抽奖成功，等待开奖',
    condition:'',
    other_text:'邀请好友参与抽奖，提高中奖几率',
    bless:'恭喜发财，大吉大利',
    isindex:false,
    gift_detail: gift_detail,
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
    var that=this
    var title_text='礼物已经准备完毕，送出去吧'
    console.log(options)
    if(options.source=='index'){
      app.post('order/order_detail', {'order_id':options.order_id}).then((res)=>{
        console.log(res)
        if(res.code==200){
          gift_detail=res.data.order
          switch (Number(gift_detail.gameplaydata)){
            case 2:
              gift_detail.condition = gift_detail.condition+'开奖'
              break;
            case 3:
              gift_detail.condition = '满' + gift_detail.condition+'人开奖'
              break;
            default:
              gift_detail.condition = '礼物红包'
              break;
          }
         
          that.setData({
            isindex: true,
            gift_detail: gift_detail,
            gifts: gift_detail.gifts,
            title_text
          })
          console.log(gift_detail)
        }
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