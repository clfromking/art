// pages/saveImg/saveImg.js
const app=getApp()
const ctx = wx.createCanvasContext('myCanvas')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:'',
    isauthor:true,
    moments:{},
    code1:'',
    isshow:false
  },

  saveImg:function(e){
    var that=this
    console.log(1)
    wx.authorize({
      scope: 'scope.writePhotosAlbum',
      success:function(res){
        wx.saveImageToPhotosAlbum({
          filePath: that.data.src,
          success: function (res) {
            wx.showToast({
              title: '保存成功',
            })
          },
          fail: function (res) {
            wx.showToast({
              title: '保存失败，请重试',
              icon:'none'
            })
          }
        })
      },
      fail:function(res){
        if(that.data.isauthor==false){
          wx.navigateTo({
            url: '../author/author?type=saveImg',
          })
          return
        }
        that.setData({
          isauthor:false
        })
        console.log('失败')
      }
    })
    // wx.saveImageToPhotosAlbum({
    //   filePath: that.data.src,
    //   success: function (res) {
    //     console.log(res)
    //   },
    //   fail: function (res) {
    //     console.log(res)

    //   }
    // })
    
  },


  //画字
  drawText:function(shareTitle,shareTitle1,wish,condition){
    ctx.setFontSize(24)
    ctx.setTextAlign('center')
    // ctx.fillStyle = "#FFFEC5";
    ctx.setFillStyle('#FFFEC5')
    // ctx.fillText('先到先得', 345.5, 950)
    ctx.fillText('长按小程序码领礼物', 345.5, 934)
    ctx.setFontSize(30)
    ctx.setTextAlign('center')
    ctx.setFillStyle('#FFF587')
    // ctx.fillStyle = "#FFF587";
    ctx.fillText(condition, 345.5, 880)
    ctx.setFontSize(42)
    console.log(wish)
    ctx.setTextAlign('center')
    ctx.fillText(wish, 345.5, 802)
    ctx.setFontSize(30)
    // ctx.fillStyle = "#FFFE8D";
    ctx.setFillStyle('#FFFE8D')
    ctx.setTextAlign('center')
    ctx.fillText(shareTitle, 345.5,660)
    ctx.setFontSize(26)
    ctx.setTextAlign('center')
    ctx.fillText(shareTitle1, 345.5, 710)
    this.drawImg()
    
  },

  //画图
  drawImg:function(){
    var that=this
    switch(Number(that.data.moments.gifts.length)){
      case 1:
        Promise.all([
          that.getimginfo(that.data.moments.gifts[0].image),
        ]).then((res) => {
          ctx.setStrokeStyle('#da0202')
          ctx.setLineWidth(2)
          ctx.strokeRect(205.5, 15, 292, 292)
          ctx.beginPath()
          ctx.rect(206.5, 16, 290, 290)
          ctx.setFillStyle('#fff')
          ctx.fill()
          ctx.drawImage(res[0].path, 227.5, 37, 250, 250)
          ctx.closePath()
          
          ctx.setFontSize(30)
          ctx.setTextAlign('center')
          ctx.fillStyle = "#000";
          var word = that.data.moments.gifts[0].name
          word = word.length > 16 ? word.substring(0, 16) + '...' : word
          ctx.fillStyle = "#000";
          ctx.fillText(word, 345.5, 349)
          ctx.fillStyle = "#da0202";
          ctx.fillText('x' + that.data.moments.gifts[0].num, 345.5, 399)


          ctx.beginPath()
          ctx.arc(349.5, 530, 76, 0, 2 * Math.PI)
          ctx.setFillStyle('#ffffff')
          ctx.fill()
          ctx.closePath()
          // console.log()
          Promise.all([
            that.getimginfo(that.data.code1),
            that.getimginfo(that.data.moments.avatar)
          ]).then((res) => {
            console.log(res)
            ctx.drawImage(res[0].path, 284.5, 465, 132, 132)

            ctx.save()
            ctx.beginPath()
            ctx.arc(350.5, 531, 30, 0, 2 * Math.PI)
            // ctx.setFillStyle('#da0202')
            ctx.fill()
            ctx.clip()
            ctx.drawImage(res[1].path, 320.5, 501,60,60)
            ctx.restore()
            that.canvasDraw()
          }).catch((error) => {
            console.log(error)
            that.drawImg()
          })



        }).catch((error) => {
          console.log(error)
          that.drawImg()
        })
        break;
      case 2:
        Promise.all([
          that.getimginfo(that.data.moments.gifts[0].image),
          that.getimginfo(that.data.moments.gifts[1].image),
        ]).then((res) => {
          ctx.setStrokeStyle('#da0202')
          ctx.setLineWidth(2)
          ctx.strokeRect(80.5, 85, 248, 248)

          ctx.beginPath()
          ctx.rect(81.5, 86, 246, 246)
          ctx.setFillStyle('#fff')
          ctx.fill()
          ctx.drawImage(res[0].path, 98.5, 103, 214, 214)
          ctx.closePath()

          ctx.strokeRect(360.5, 85, 248, 248)

          ctx.beginPath()
          ctx.rect(361.5, 86, 246, 246)
          ctx.setFillStyle('#fff')
          ctx.fill()
          ctx.drawImage(res[1].path, 378.5, 103, 214, 214)
          ctx.closePath()


          
          ctx.beginPath()
          ctx.arc(349.5, 530, 76, 0, 2 * Math.PI)
          ctx.setFillStyle('#ffffff')
          ctx.fill()
          ctx.closePath()
          // console.log()
          Promise.all([
            that.getimginfo(that.data.code1),
            that.getimginfo(that.data.moments.avatar)
          ]).then((res) => {
            console.log(res)
            ctx.drawImage(res[0].path, 284.5, 465, 132, 132)

            ctx.save()
            ctx.beginPath()
            ctx.arc(350.5, 531, 30, 0, 2 * Math.PI)
            // ctx.setFillStyle('#da0202')
            ctx.fill()
            ctx.clip()
            ctx.drawImage(res[1].path, 320.5, 501,60,60)
            ctx.restore()
            that.canvasDraw()
          }).catch((error) => {
            that.drawImg()
          })



        }).catch((error) => {
          console.log(error)
          that.drawImg()
        })
        break;
      case 3:
        Promise.all([
          that.getimginfo(that.data.moments.gifts[0].image),
          that.getimginfo(that.data.moments.gifts[1].image),
          that.getimginfo(that.data.moments.gifts[2].image)
        ]).then((res) => {
          ctx.setStrokeStyle('#da0202')
          ctx.setLineWidth(2)
          ctx.strokeRect(80.5, 35, 248, 248)

          ctx.beginPath()
          ctx.rect(81.5, 36, 246, 246)
          ctx.setFillStyle('#fff')
          ctx.fill()
          ctx.drawImage(res[2].path, 98.5, 53, 214, 214)
          ctx.closePath()

          ctx.strokeRect(360.5, 35, 248, 248)

          ctx.beginPath()
          ctx.rect(361.5, 36, 246, 246)
          ctx.setFillStyle('#fff')
          ctx.fill()
          ctx.drawImage(res[1].path, 378.5, 53, 214, 214)
          ctx.closePath()


          ctx.strokeRect(205.5, 105, 292, 292)
          ctx.beginPath()
          ctx.rect(206.5, 106, 290, 290)
          ctx.setFillStyle('#fff')
          ctx.fill()
          ctx.drawImage(res[0].path, 227.5, 127, 250, 250)
          ctx.closePath()

          ctx.beginPath()
          ctx.arc(349.5, 530, 76, 0, 2 * Math.PI)
          ctx.setFillStyle('#ffffff')
          ctx.fill()
          ctx.closePath()
          // console.log()
          Promise.all([
            that.getimginfo(that.data.code1),
            that.getimginfo(that.data.moments.avatar)
          ]).then((res) => {
            console.log(res)
            ctx.drawImage(res[0].path, 284.5, 465, 132, 132)

            ctx.save()
            ctx.beginPath()
            ctx.arc(350.5, 531, 30, 0, 2 * Math.PI)
            // ctx.setFillStyle('#da0202')
            ctx.fill()
            ctx.clip()
            ctx.drawImage(res[1].path, 320.5, 501,60,60)
            ctx.restore()
            that.canvasDraw()
          }).catch((error) => {
            console.log(error)
            that.drawImg()
          })



        }).catch((error) => {
          console.log(error)
          that.drawImg()
        })
        break;
      default :
        Promise.all([
          that.getimginfo(that.data.moments.gifts[0].image),
          that.getimginfo(that.data.moments.gifts[1].image),
          that.getimginfo(that.data.moments.gifts[2].image)
        ]).then((res)=>{

          ctx.setStrokeStyle('#F2B0B1')
          ctx.setLineWidth(2)
          ctx.strokeRect(220.5, 10, 248, 248)

          ctx.beginPath()
          ctx.rect(231.5, 21, 226, 226)
          ctx.setFillStyle('#e0e0e0')
          ctx.fill()
          ctx.font = 'normal bold 48px sans-serif'
          ctx.fillStyle = "#da0202";
          ctx.fillText("· · ·", 345.5, 70)
          ctx.closePath()

          ctx.setStrokeStyle('#da0202')
          ctx.strokeRect(80.5, 85, 248, 248)

          ctx.beginPath()
          ctx.rect(81.5, 86, 246, 246)
          ctx.setFillStyle('#fff')
          ctx.fill()
          ctx.drawImage(res[2].path, 98.5, 103, 214, 214)
          ctx.closePath()

          ctx.strokeRect(360.5, 85, 248, 248)

          ctx.beginPath()
          ctx.rect(361.5, 86, 246, 246)
          ctx.setFillStyle('#fff')
          ctx.fill()
          ctx.drawImage(res[1].path, 378.5, 103, 214, 214)
          ctx.closePath()


          ctx.strokeRect(205.5, 105, 292, 292)
          ctx.beginPath()
          ctx.rect(206.5, 106, 290, 290)
          ctx.setFillStyle('#fff')
          ctx.fill()
          ctx.drawImage(res[0].path, 227.5, 127, 250, 250)
          ctx.closePath()

          ctx.beginPath()
          ctx.arc(349.5, 530, 76, 0, 2 * Math.PI)
          ctx.setFillStyle('#ffffff')
          ctx.fill()
          ctx.closePath()
          // console.log()
          Promise.all([
            that.getimginfo(that.data.code1),
            that.getimginfo(that.data.moments.avatar)
          ]).then((res)=>{
            console.log(res)
            ctx.drawImage(res[0].path, 284.5, 465, 132, 132)
            
            ctx.save()
            ctx.beginPath()
            ctx.arc(350.5, 531,30,0, 2 * Math.PI)
            // ctx.setFillStyle('#da0202')
            ctx.fill()
            ctx.clip()
            ctx.drawImage(res[1].path, 320.5, 501,60,60)
            ctx.restore()
            that.canvasDraw()
          }).catch((error)=>{
            that.drawImg()
          })
          

          
        }).catch((error)=>{
          console.log(error)
          that.drawImg()
        })
        break;
    }
  },

  //获取图片信息
  getimginfo: function (img) {
    var promise = new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: img,
        success: function (res) {
          resolve(res)
        },
        fail: function (error) {
          reject(error);
        }
      })
    })
    return promise
  },

  //画canvas
  canvasDraw: function () {
    var that = this
    ctx.draw(false, function (e) {
      if (e.errMsg == 'drawCanvas:ok') {
        setTimeout(function () {
          wx.canvasToTempFilePath({
            canvasId: 'myCanvas',
            success: function (res) {
              console.log(res.tempFilePath)
              that.setData({
                // shareTitle: that.data.gift_detail.uname+'赠送给你一种礼物，请点击查看。',
                src: res.tempFilePath,
                isshow:true
                // sharePath:'pages/index/index'
              })

              wx.hideLoading()
              wx.showShareMenu({

              })

            },

          }, this)
        }, 0)
      }
      else {
        
        that.canvasDraw()
      }
    })
  },

  //获取小程序二维码
  getCode:function(){
    app.post('getwxacode/get_wx_acode', { 'scene': 0 }, 1).then((res) => {
      console.log(res)
    }).catch((error) => {
      console.log(error)
    })
  },
  // 预览图
  previewimg:function(){
    wx.previewImage({
      urls: [this.data.src]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '图片生成中',
      mask: true
    })
    var that=this
    var value 
    try {
      value  = wx.getStorageSync('moments')

    } catch (e) {
      // Do something when catch error
    }
    // console.log(value)
    var postdata = {
      scene: 'lottery' + ',' + value.order_id + ',' + value.inviter,
      page: "pages/raffle/raffle"
    }
    app.post('getwxacode/get_wx_acode', postdata, 1).then((res) => {   
      console.log(res)
      if (res.code==200) {
        that.setData({
          code1: res.data
        })
        wx.getImageInfo({
          src: 'https://pic.forunart.com/artgive/wx/fenxiangtupian%282%29_hongbao@3x.png',
          success: function (res) {
            ctx.drawImage(res.path, 0, 0, 691, 976)
            wx.getStorage({
              key: 'moments',
              success: function (res) {
                that.setData({
                  moments: res.data
                })
                that.drawText(res.data.shareTitle,res.data.shareTitle1, res.data.wish, res.data.condition)
              },
            })


          }
        })
      }
      else{
        wx.hideLoading();
        wx.showToast({
          title: '生成失败，请重试',
          mask:true
        })
        setTimeout(function(){
          wx.navigateBack({
            
          })
        },1500)
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
    return app.commonShare()
  }
})