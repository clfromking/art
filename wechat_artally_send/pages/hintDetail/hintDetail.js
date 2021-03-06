// pages/hintDetail/hintDetail.js
const app=getApp()
const ctx = wx.createCanvasContext('myCanvas1')
let swiper_imgs = []
let detail_msg={}
let prec=[]
let iscommon=false
var swiperLoadnum=0
var swipersuccessload=false
var detailsuccessload=false
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
    specification_price:'',
    specification_repertory:0,
    gift_id:0,
    isshowindicator:false,
    shareimg:"",
    hidehome: true,
    imgHeight:'',
    integralHide: '',
    html:'',
    html1: '<img style="width:100%;" src="https://img.yzcdn.cn/upload_files/2018/04/24/FjEqxBCPHSg8awgYW1tfLZbzCB52.jpg!730x0.jpg" />'
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
      specification_price: prec_arr[e.currentTarget.dataset.id].price,
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
    if (Number(e.detail.value) > this.data.specification_repertory){
      this.setData({
        gifts_num: this.data.specification_repertory
      })
      return
    }
    
    
    this.setData({
      gifts_num:e.detail.value
    })
    // console.log(e)
  },

  inputBlur:function(e){
    if(Number(e.detail.value) <= 0){
      this.setData({
        gifts_num: 1
      })
      return
    }
  },


  //确定购买
  confirmBuy:function(){
    var that=this
    wx.getStorageInfo({
      success: function (res) {
        console.log(res.keys.indexOf('gifts'))
        if (res.keys.indexOf('gifts')<=-1){
          var data=[]
          
          var giftObj = { 'name': that.data.detail_msg.name, 'describe': that.data.detail_msg.describe, 'price': that.data.specification_price }
         
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
              wx.switchTab({
                url: '../index/index',
              })
            }
          })
        }
        else{
          wx.getStorage({
            key: 'gifts',
            success: function(res) {
              var data=res.data
              var giftObj = { 'name': that.data.detail_msg.name, 'describe': that.data.detail_msg.describe, 'price': that.data.specification_price }
              for (var i = 0; i < that.data.specification.length; i++) {
                if (that.data.specification[i].isselect == true) {
                  for(var j=0;j<data.length;j++){
                    if(that.data.specification[i].id==data[j].id){
                      data[j].num =Number(that.data.gifts_num)
                      // console.log(that.data)
                      data[j].repertory = Number(that.data.specification_repertory)
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
                console.log(giftObj)
                data.push(giftObj)
              }
              // data.push(giftObj)
              wx.setStorage({
                key: 'gifts',
                data: data,
                success: function (res) {
                  // console.log(res)
                  wx.switchTab({
                    url: '../index/index',
                  })
                }
              })
            },
          })
        }
      },
    })
  },


  //轮播图加载事件
  swiperImgLoad:function(e){
    // console.log(swipersuccessload)
    // console.log(e)
    // swiperLoadnum++
    // if (swiperLoadnum >= swiper_imgs.length){
    //   swipersuccessload=true
    // }
    // if(swipersuccessload==true){
    //   wx.hideLoading()
    // }
    // console.log(swipersuccessload)
  },

  //详情图加载事件
  detailImgLoad:function(e){
    // detailsuccessload=true
    // if (swipersuccessload == true && detailsuccessload == true) {
    //   wx.hideLoading()
    // }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.sign) {

    }
    else {
      app.LaunchSetIntegral().then((res) => {
        console.log(res)
        this.setData({
          integralHide: res.status,
          // integralNum: res.num
        })
      })
    }
    
    let historys = [], pages = getCurrentPages();
    for (let i = 0; i < pages.length; i++) {
      historys.push(pages[i].route)
    }
    app.showHome(this)
    // return
    console.log(iscommon)
    console.log(options)
    wx.hideShareMenu()
    wx.showLoading({
      mask:true,
      title: '数据加载中',
    })
    // options.id=359
    var data={'giftid':options.id}
    var that=this
    app.post('gifts/detail', data).then((res)=>{
      
      var rich_img = res.data.lists.desc.replace(/\<img/gi, '<img class="rich-img" ');
      // console.log(rich_img)
      if(res.code== 200){
        var specification = res.data.lists.specification
        if(res.data.lists.imgs.length>1){
          that.setData({
            isshowindicator:true
          })
        }
        for (var i = 0; i < specification.length;i++){
          if(i==0){
            specification[i].isselect=true
          }
          else{
            specification[i].isselect=false
          }
         
        }
        swiper_imgs=res.data.lists.imgs
        detail_msg = { 'name': res.data.lists.name, 'describe': res.data.lists.describe, 'price': res.data.lists.price, smallimg: res.data.lists.mini_image}
        if (specification.length == 0 || res.data.lists.shelfdata==0){
          wx.hideLoading()
          that.setData({
            swiper_imgs: swiper_imgs,
            detail_msg: detail_msg,
            detail_image: res.data.lists.detail_image,
            html: rich_img
          })
          wx.showModal({
            title: '提示',
            content: '该商品已售罄！',
            showCancel:false,
            confirmText: "立即返回",
            success: function (res) {
              if (historys.length == 1) {
                wx.switchTab({
                  url: '/pages/index/index',
                })
              } else {
                wx.navigateBack({})
              }
            }
          })
          return
        }
        // that.createimg(detail_msg.smallimg,detail_msg.name) 
        that.setData({
          swiper_imgs:swiper_imgs,
          detail_msg:detail_msg,
          detail_image: res.data.lists.detail_image,
          imgHeight:Number(res.data.lists.detail_ratio)*750+'rpx',
          specification: specification,
          specification_img: specification[0].image,
          specification_price: specification[0].price,
          specification_repertory: specification[0].repertory,
          gift_id:options.id,
          shareimg: res.data.lists.shareimg,
          html: rich_img
        })
        wx.hideLoading()
        wx.showShareMenu()
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
    this.setData({
      integralHide: app.globalData.ishideIntegral
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.globalData.ishideIntegral = true
    app.globalData.sign = true
   
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    app.globalData.ishideIntegral = true
    app.globalData.sign = true
    swipersuccessload = false
    detailsuccessload = false
    iscommon = false
    swiperLoadnum=0
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
  // canvas draw
  // canvasDraw: function () {
  //   var that = this
  //   ctx.draw(false, function (e) {
  //     console.log(e)
  //     if (e.errMsg =='drawCanvas:ok') {
  //       setTimeout(function () {
  //         wx.canvasToTempFilePath({
  //           x: 0,
  //           y: 0,
  //           width: 500*2,
  //           height: 400*2,
  //           destWidth: 500*2,
  //           destHeight: 400*2,
  //           canvasId: 'myCanvas1',
  //           success: function (res2) {
  //             // console.log(res2.tempFilePath)
  //             that.setData({
  //               shareimg: res2.tempFilePath
  //             })
  //             wx.hideLoading()
  //             wx.showShareMenu()
  //           }, fail: function () {
  //             wx.showShareMenu()
  //           }
  //         })
  //       }, 10)
  //     }
  //     else {
  //       that.canvasDraw()
  //     }
  //   })
  // },
  // 生成图片
  // createimg: function (img,name) {
  //   var that = this;
  //   wx.getImageInfo({
  //     src: img,
  //     success: function (res1) {
  //       // console.log(res1)
  //       ctx.setFillStyle('#f2f2f2')
  //       ctx.fillRect(0, 0, 500*2, 400*2)
  //       ctx.setStrokeStyle('#da0202')
  //       ctx.setLineWidth(8*2)
  //       ctx.strokeRect(4*2, 4*2, 488*2, 392*2)
  //       ctx.setFillStyle('white')
  //       ctx.fillRect(100*2, 30*2, 300*2, 340*2)
  //       ctx.drawImage(res1.path, 100*2, 30*2, 300*2, 300*2)
  //       ctx.setFontSize(20*2)
  //       ctx.setFillStyle('black')
  //       name = name.length > 12 ? name.substring(0, 12) + '...' : name;
  //       ctx.fillText(name, 120*2, 355*2)
  //       that.canvasDraw();
  //     },
  //     fail: function (res) {
  //       console.log(res)
  //     }
  //   })
  // },
  /**
   * 用户点击右上角分享**
   */
  onShareAppMessage: function (res) {
    let that = this, 
      name = wx.getStorageSync('userInfo').username;
      name=name.length>12?name.substring(0,12)+'...':name
    return{
      title: (name ? name: "我") + "觉得这款商品不错，邀请你去看看",
      imageUrl: that.data.shareimg
    }
  },

})