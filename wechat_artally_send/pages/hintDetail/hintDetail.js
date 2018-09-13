// pages/hintDetail/hintDetail.js
const app=getApp()
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
    specification_repertory:0,
    gift_id:0,
    isshowindicator:false,
    shareimg:""
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
              var giftObj = { 'name': that.data.detail_msg.name, 'describe': that.data.detail_msg.describe, 'price': that.data.detail_msg.price }
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
    console.log(iscommon)
    console.log(options)
    wx.hideShareMenu()
    wx.showLoading({
      mask:true,
      title: '数据加载中',
    })
    // options.id=70
    var data={'giftid':options.id}
    var that=this
    app.post('gifts/detail', data).then((res)=>{
      console.log(res)
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
        detail_msg = { 'name': res.data.lists.name, 'describe': res.data.lists.describe, 'price': res.data.lists.price, smallimg: res.data.lists.price.mini_image}
        if (specification.length==0){
          wx.showToast({
            icon:'none',
            mask:true,
            duration:2000,
            title: '该商品已售罄，正在补货中',
            success:function(){
              that.setData({
                swiper_imgs: swiper_imgs,
                detail_msg: detail_msg,
                detail_image: res.data.lists.detail_image,
              })
              setTimeout(function(){
                wx.navigateBack({
                  
                })
              },2000)
              return
            }
          })
        }
        that.createimg(detail_msg.smallimg,detail_msg.name)
        that.setData({
          swiper_imgs:swiper_imgs,
          detail_msg:detail_msg,
          detail_image: res.data.lists.detail_image,
          specification: specification,
          specification_img: specification[0].image,
          specification_repertory: specification[0].repertory,
          gift_id:options.id
        })
        wx.hideLoading()
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
  // 生成图片
  createimg: function (img,name) {
    var that = this;
    wx.getImageInfo({
      src: img,
      success: function (res1) {
        // console.log(res1)
        const ctx = wx.createCanvasContext('myCanvas1')
        ctx.setFillStyle('#f2f2f2')
        ctx.fillRect(0, 0, 500, 400)
        ctx.setStrokeStyle('#da0202')
        ctx.setLineWidth(8)
        ctx.strokeRect(4, 4, 488, 392)
        ctx.setFillStyle('white')
        ctx.fillRect(100, 30, 300, 340)
        ctx.drawImage(res1.path, 100, 30, 300, 300)
        ctx.setFontSize(16)
        ctx.setFillStyle('black')
        name = name.length > 16 ? name.substring(0, 16) + '...' : name;
        ctx.fillText(name, 120, 355)
        ctx.draw(setTimeout(function(){
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 500,
            height: 400,
            destWidth: 500,
            destHeight: 400,
            canvasId: 'myCanvas1',
            success: function (res2) {
              // console.log(res2.tempFilePath)
              that.setData({
                shareimg: res2.tempFilePath
              })
              wx.showShareMenu()
            },fail:function(){
              wx.showShareMenu()
            }
          })
        },1000));
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    let that = this, 
      name = wx.getStorageSync('userInfo').username;
    return{
      title: (name ? name : "我") + "觉得这款商品不错，邀请你去看看",
      imageUrl: that.data.shareimg
    }
  },

})