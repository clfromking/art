// pages/hintDetail/hintDetail.js
const app=getApp()
let swiper_imgs = ['https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'https://pic.forunart.com/artgive/wx/mall_nav_icon_all_pressed.png', 'https://pic.forunart.com/artgive/wx/mall_nav_icon_all_pressed.png','https://pic.forunart.com/artgive/wx/mall_nav_icon_all_pressed.png']
let detail_msg={}
let prec=[true,false]
let iscommon=false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper_imgs:swiper_imgs,
    detail_msg:detail_msg,
    isHidebuy:true,
    prec:prec,
    gifts_num:1,
    detail_image:'',
    specification:[],
    specification_img:'',
    specification_repertory:0,
    gift_id:0
  },
  buyThis:function(){
    this.setData({
      isHidebuy:false
    })
  },
  closeBuy:function(){
    this.setData({
      isHidebuy:true
    })
  },

  selectPrec:function(e){
    var prec_arr = this.data.specification
    for(var i=0;i<prec_arr.length;i++){
      prec_arr[i].isselect=false
    }
    prec_arr[e.currentTarget.dataset.id].isselect=true

    this.setData({
      specification: prec_arr,
      specification_img: prec_arr[e.currentTarget.dataset.id].image,
      specification_repertory: prec_arr[e.currentTarget.dataset.id].repertory,
      gifts_num:1
    })
  },

  addNum:function(){
    if (this.data.gifts_num >= this.data.specification_repertory){
      return
    }
    var gifts_num=this.data.gifts_num;
    gifts_num++
    this.setData({
      gifts_num: gifts_num
    })
  },

  subNum:function(){
    if (this.data.gifts_num <= 1) {
      return
    }
    var gifts_num = this.data.gifts_num;
    gifts_num--
    this.setData({
      gifts_num: gifts_num
    })
  },

  inputNum:function(e){
    console.log(e)
    console.log(Number(e.detail.value))
    if (Number(e.detail.value) > this.data.specification_repertory){
      this.setData({
        gifts_num: this.data.specification_repertory
      })
      return
    }
    else if (Number(e.detail.value)<=0){
      this.setData({
        gifts_num: 1
      })
      return
    }
    
    this.setData({
      gifts_num:e.detail.value
    })
    // console.log(e)
  },

  //确定购买
  confirmBuy:function(){
    // wx.reLaunch({
    //   url: '../index/index',
    // })
    var that=this
    wx.getStorageInfo({
      success: function (res) {
        console.log(res.keys.indexOf('gifts'))
        if (res.keys.indexOf('gifts')<=-1){
          var data=[]
          
          var giftObj = { 'name': that.data.detail_msg.name, 'describe': that.data.detail_msg.describe, 'price': that.data.detail_msg.price }
         
          for(var i=0;i<that.data.specification.length;i++){
            if(that.data.specification[i].isselect==true){
              giftObj.image=that.data.specification[i].image
              giftObj.id=that.data.specification[i].id
              giftObj.repertory=that.data.specification[i].repertory
              giftObj.num=that.data.gifts_num
            }
            else{
              
            }
          }
          data.push(giftObj)
          wx.setStorage({
            key: 'gifts',
            data: data,
            success:function(res){
              console.log(res)
            }
          })
        }
        else{
          wx.getStorage({
            key: 'gifts',
            success: function(res) {
              console.log(res.data)
              var data=res.data
              var giftObj = { 'name': that.data.detail_msg.name, 'describe': that.data.detail_msg.describe, 'price': that.data.detail_msg.price }
              for (var i = 0; i < that.data.specification.length; i++) {
                if (that.data.specification[i].isselect == true) {
                  for(var j=0;j<data.length;j++){
                    if(that.data.specification[i].id==data[j].id){
                      data[j].num =Number(data[j].num)+Number(that.data.gifts_num)
                      iscommon=true
                    }
                  }
                  giftObj.image = that.data.specification[i].image
                  giftObj.id = that.data.specification[i].id
                  giftObj.repertory = that.data.specification[i].repertory
                  giftObj.num = that.data.gifts_num
                }
                else {

                }
              }
              // console.log(iscommon)
              if(iscommon){

              }
              else{
                data.push(giftObj)
              }
              // data.push(giftObj)
              wx.setStorage({
                key: 'gifts',
                data: data,
                success: function (res) {
                  console.log(res)
                }
              })
            },
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // options.id=70
    var data={'giftid':options.id}
    var that=this
    app.post('gifts/detail', data).then((res)=>{
      // console.log(res)
      if(res.data.code== 200){
        var specification = res.data.data.lists.specification
        for (var i = 0; i < specification.length;i++){
          if(i==0){
            specification[i].isselect=true
          }
          else{
            specification[i].isselect=false
          }
         
        }
        swiper_imgs=res.data.data.lists.imgs
        detail_msg = { 'name': res.data.data.lists.name, 'describe': res.data.data.lists.describe, 'price': res.data.data.lists.price}
        that.setData({
          swiper_imgs:swiper_imgs,
          detail_msg:detail_msg,
          detail_image: res.data.data.lists.detail_image,
          specification: specification,
          specification_img: specification[0].image,
          specification_repertory: specification[0].repertory,
          gift_id:options.id
        })
        // console.log(this.data.specification)
      }
    }).catch((error)=>{
      console.log(error)
    })
    // app.post()
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
  true:function()
  {}

})