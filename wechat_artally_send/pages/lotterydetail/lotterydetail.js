// pages/lotterydetail/lotterydetail.js\
const app=getApp()
const ctx=wx.createCanvasContext('myCanvas')
let gift_detail={}
let uid
let order_id
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gifts:[
    ],
    heads:[
    ],
    currentSwiper:0,
    sharelist:["分享给朋友","分享到朋友圈"],
    notShare:true,
    title_text:'',
    condition:'',
    other_text:'邀请好友参与抽奖，提高中奖几率',
    bless:'恭喜发财，大吉大利。',
    isfinish:false,
    gift_detail: gift_detail,
    uid:0,
    ishowSpebtn:false,
    ishideodds:false,
    ishideodds1:false,
    winList:[],
    ishave:false,
    ismy:false,
    ismyOneContinue:false,
    ismyBtntext:'还要送礼物',
    ismy2haveBtntext:'邀请好友抽奖',
    isreceivePerson:false,
    isshowWhite:true,
    banner_msgs:'',
    shareTitle:'',
    shareTitle1: '',
    shareImg:'',
    sharePath:'',
    isload:false,
    hidehome: true,
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
      var momentsData = { 'shareTitle': this.data.shareTitle,'shareTitle1':this.data.shareTitle1, 'condition': this.data.gift_detail.condition, 'wish': this.data.gift_detail.wish ? this.data.gift_detail.wish : '恭喜发财，大吉大利。', 'gifts': this.data.gifts, 'avatar': this.data.gift_detail.cavatar ? this.data.gift_detail.cavatar :'https://pic.forunart.com/artgive/wx/me_img.png','order_id':this.data.gift_detail.id,'inviter':uid}
      wx.setStorage({
        key: 'moments',
        data: momentsData,
        success:function(res){
          console.log(res)
          wx.navigateTo({
            url: '../saveImg/saveImg',
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.showHome(this)
    wx.showLoading({
      title: '数据加载中',
      mask:true
    })
    wx.hideShareMenu({
      
    })
    try {
      var res = wx.getStorageSync('userInfo')
      uid=res.uid
    } catch (e) {
    }
    var that=this
    var isshowWhite = false
    var title_text='礼物准备完毕，送出去'
    app.post('banner/lists', { 'position': 4 }).then((res) => {
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
    order_id = options.order_id
    // options.source='lottery'
    if(options.source=='index'){
      app.post('order/order_detail', { 'order_id': options.order_id }).then((res) => {
        console.log(res)
        var shareTitle=''
        var shareTitle1= ''
        if (res.code == 200) {
          var ismy2haveBtntext = that.data.ismy2haveBtntext
          ismy2haveBtntext='发送给好友 '
          gift_detail = res.data.order
          switch (Number(gift_detail.gameplaydata)) {
            case 2:
              gift_detail.condition = gift_detail.condition + '开奖'
              shareTitle=gift_detail.cname
              shareTitle1='邀请你参与抽奖'
              break;
            case 3:
              gift_detail.condition = '满' + gift_detail.condition + '人开奖'
              shareTitle = gift_detail.cname
              shareTitle1 = '邀请你参与抽奖'
              break;
            default:
              gift_detail.condition = '礼物红包'
              shareTitle = gift_detail.cname
              shareTitle1 = '赠送给你一' + (gift_detail.gifts.length == 1 ? '种礼物' : '个礼包')
              break;
          }
 
          that.setData({
            ishideodds: true,
            ishideodds1: true,
            gift_detail: gift_detail,
            gifts: gift_detail.gifts,
            title_text,
            uid: uid,
            isshowWhite,
            ismy2haveBtntext,
            shareTitle,
            shareTitle1
          })
          that.drawText(gift_detail.wish,gift_detail.condition)
        }
      }).catch((error) => {
        console.log(error)
      })
      
    }
    else if(options.source=='lottery'){
      var postData = { 'order_id': options.order_id, 'uid': uid }
      console.log(postData)
      // postData={'order_id':149,'uid':77}
      app.post('order/order_detail', postData).then((res) => {
        console.log(res)
        if (res.code == 200) {
          var gift_detail = res.data.order
          var title_text
          var ishowSpebtn = false
          var ishideodds = false
          var isfinish = false
          var ishave = false
          var ishideodds1=false
          var shareTitle=''
          var shareTitle1 = ''
          var other_text = that.data.other_text
          var isreceivePerson = that.data.isreceivePerson
          if (Number(gift_detail.giftbagdata) == 1) {
            title_text = '请等待，成功参与抽奖'
          }
          else if (Number(gift_detail.giftbagdata) == 2) {
            title_text = '很遗憾，您未抽中大奖'
            ishowSpebtn = true
            switch (Number(gift_detail.status)) {
              case 0:
                title_text = '很遗憾，礼物已经过期'
                isfinish = false
                ishideodds = true
                ishideodds1=true
                break;
              case 1:
                break;
              case 2:
                title_text = '恭喜您，您已抽中大奖'
                other_text = ''               
                isfinish = true
                ishave = true
                break;
              case 3:
                title_text = '很遗憾，您没有抽中大奖'
                other_text = ''
                isfinish = true
                break;
            }
          }
          else if (Number(gift_detail.giftbagdata) == 3) {
            title_text = '很遗憾，礼物已经过期'
            ishideodds = true
            ishideodds1=true
            isfinish = false
            ishowSpebtn = true
          }

          switch (Number(gift_detail.gameplaydata)) {
            case 2:
              gift_detail.condition = gift_detail.condition + '开奖'
              shareTitle = gift_detail.cname 
              shareTitle1='邀请你参与抽奖'
              break;
            case 3:
              gift_detail.condition = '满' + gift_detail.condition + '人开奖'
              shareTitle = gift_detail.cname
              shareTitle1 = '邀请你参与抽奖'
              break;
            default:
              gift_detail.condition = '礼物红包'
              shareTitle = gift_detail.cname
              shareTitle1 = '赠送给你一' + (gift_detail.gifts.length == 1 ? '种礼物' : '个礼包')
              if (Number(gift_detail.status) == 0) {
                title_text = '很遗憾，礼物已经抢光'
                // ishowSpebtn = true
              }
              else if (Number(gift_detail.status) == 2) {
                title_text = '礼物已经领取，好开心'
                ishowSpebtn = true
                ishideodds = true
                ishideodds1=true
                ishave = true
                isreceivePerson=true
              }

              break;
          }
          if (!gift_detail.wish) {
            gift_detail.wish = ''
          }

          gift_detail.inviter_count = Number(gift_detail.inviter_count)
          console.log(gift_detail)
          that.setData({
            gift_detail: gift_detail,
            gifts: gift_detail.gifts,
            title_text,
            heads: gift_detail.client,
            uid: uid,
            ishowSpebtn,
            ishideodds,
            ishideodds1,
            isfinish,
            other_text,
            winList: gift_detail.win || '',
            ishave,
            isshowWhite,
            shareTitle,
            shareTitle1,
            isreceivePerson
          })
          that.drawText(gift_detail.wish, gift_detail.condition)

        }
      }).catch((error) => {
        console.log(error)
      })
    }
    else if(options.source=='my'){
      console.log(options.type)
      var postData={}
      var that=this
      if(options.type==1){
        postData = { 'order_id': options.order_id }
        app.post('order/order_detail', postData).then((res) => {
          console.log(res)
          if(res.code==200){
            var title_text=''
            var condition=''
            var ishideodds=false
            var ishideodds1=false
            var isfinish=false
            var ismy=true
            var ismyOneContinue=false
            var gift_detail = res.data.order
            var shareTitle=''
            var shareTitle1=''
            var isreceivePerson = that.data.isreceivePerson
            if (Number(gift_detail.gameplaydata)==1) {     //点对点
              ishideodds = true
              ishideodds1 = true
              if (Number(gift_detail.giftbagdata)==1){    //进行中
                title_text ='礼物等待领取，莫着急'
                gift_detail.condition = '礼物红包'
                ismyOneContinue = false
                shareTitle = gift_detail.cname
                shareTitle1 = '赠送给你一' + (gift_detail.gifts.length == 1 ? '种礼物' : '个礼包')
              }
              else if (Number(gift_detail.giftbagdata) == 2){    //已完成
                title_text = '礼物已被领取，好开心'
                gift_detail.condition = '礼物红包'
                isfinish=true
                ismyOneContinue=true
                isreceivePerson=true
              }
              else if (Number(gift_detail.giftbagdata) == 3){    //已过期
                title_text = '礼物无人领取，已过期'
                gift_detail.condition = '礼物红包(已为您安排退款)'
                ismyOneContinue = true
              }
            }
            else if (Number(gift_detail.gameplaydata)==2){   //定时
              ishideodds = true
              ishideodds1 = false
              if (Number(gift_detail.giftbagdata) == 1) {    //进行中
                title_text ='礼物等待开奖，莫着急'
                gift_detail.condition = gift_detail.condition + '开奖'
                shareTitle = gift_detail.cname
                shareTitle1= '邀请你参与抽奖'
              }
              else if (Number(gift_detail.giftbagdata) == 2) {    //已完成
                title_text ='礼物已经抢光，好开心' 
                gift_detail.condition = gift_detail.condition+'开奖'
                isfinish=true
                ismyOneContinue=true
              }
              else if (Number(gift_detail.giftbagdata) == 3) {    //已过期
                title_text ='抽奖无人参与，已过期'
                gift_detail.condition = gift_detail.condition + '开奖(已为您安排退款)'
                ismyOneContinue = true
              }
            }
            else{     //满人
              ishideodds = true
              ishideodds1 = false
              if (Number(gift_detail.giftbagdata) == 1) {    //进行中
                title_text ='礼物等待开奖，莫着急'
                gift_detail.condition = '满'+gift_detail.condition+'人开奖'
                shareTitle = gift_detail.cname
                shareTitle1 = '邀请你参与抽奖'
              }
              else if (Number(gift_detail.giftbagdata) == 2) {    //已完成
                title_text = '礼物已被抢光，好开心'
                gift_detail.condition = '满' + gift_detail.condition + '人开奖'       
                isfinish=true
                ismyOneContinue=true
              }
              else if (Number(gift_detail.giftbagdata) == 3) {    //已过期
                title_text = '抽奖参与未满，已过期'
                gift_detail.condition = '满' + gift_detail.condition + '人开奖(已为您安排退款)'
                ismyOneContinue = true
              }
            }
            that.setData({
              title_text,
              gift_detail,
              ishideodds,
              ishideodds1,
              gifts: gift_detail.gifts,
              winList: gift_detail.win || '',
              isfinish,
              ismy,
              ismyOneContinue,
              heads: gift_detail.client,
              isshowWhite,
              shareTitle,
              shareTitle1,
              isreceivePerson
            })
            console.log(gift_detail.condition)
            that.drawText(gift_detail.wish, gift_detail.condition)
          }
          
        }).catch((error) => {
          console.log(error)
        })
      }
      else{
        postData = { 'order_id': options.order_id,'uid':uid }
        app.post('order/order_detail',postData).then((res)=>{
          console.log(res)
          if(res.code==200){
            var title_text = ''
            var condition = ''
            var ishideodds = false
            var ishideodds1 = false
            var isfinish = false
            var ismy = true
            var ishave=false
            var ismyOneContinue = false
            var isreceivePerson = that.data.isreceivePerson
            var ismyBtntext = that.data.ismyBtntext
            var gift_detail = res.data.order
            var other_text = that.data.other_text
            var ismy2haveBtntext = that.data.ismy2haveBtntext
            var ishowSpebtn=false
            var shareTitle=''
            var shareTitle1=''
            if (Number(gift_detail.gameplaydata) == 1){     //点对点
              if (Number(gift_detail.giftbagdata) == 1){    //进行中
                
              }
              else if (Number(gift_detail.giftbagdata) == 2){   //已完成
                title_text ='已经礼物领取，好开心'
                gift_detail.condition='礼物红包'
                ishideodds=true
                ishideodds1=true
                isfinish=true
                ismyBtntext='我也要送礼物'
                ismyOneContinue=true,
                isreceivePerson=true
                ishave=true
              }
              else if (Number(gift_detail.giftbagdata) == 3){     //已过期

              }
            }
            else if (Number(gift_detail.gameplaydata) == 2){    //定时
              gift_detail.wish = gift_detail.wish || ''
              ismy=false
              gift_detail.condition = gift_detail.condition + '开奖'
              if (Number(gift_detail.giftbagdata) == 1) {    //进行中
                title_text='请等待，成功参与抽奖'
                shareTitle = gift_detail.cname
                shareTitle1 = '邀请你参与抽奖'
              }
              else if (Number(gift_detail.giftbagdata) == 2) {   //已完成
                isfinish=true
                other_text=''
                switch(Number(gift_detail.status)){
                  case 2:
                    title_text ='恭喜您，您已抽中大奖'
                    ishave=true
                    ishowSpebtn = true
                    break;
                  case 3:
                    title_text ='很遗憾，您未抽中大奖'
                    ishowSpebtn=true
                    break;
                }
                
               
              }
              else if (Number(gift_detail.giftbagdata) == 3) {     //已过期
                // title_text = '请等待，成功参与抽奖'
              }
            }
            else if (Number(gift_detail.gameplaydata) == 3){    //满人
              gift_detail.wish = gift_detail.wish || ''
              ismy = false
              gift_detail.condition = '满'+gift_detail.condition + '人开奖'
              if (Number(gift_detail.giftbagdata) == 1) {    //进行中
                title_text ='请等待，成功参与抽奖'
                shareTitle = gift_detail.cname
                shareTitle1 = '邀请你参与抽奖'
              }
              else if (Number(gift_detail.giftbagdata) == 2) {   //已完成
                other_text=''
                isfinish=true
                switch(Number(gift_detail.status)){
                  case 2:
                    ishave=true
                    title_text='恭喜您，您已抽中大奖'
                    ishowSpebtn = true
                    break;
                  case 3:
                    title_text = '很遗憾，您未抽中大奖'
                    ishowSpebtn=true
                    break;
                }
              }
              else if (Number(gift_detail.giftbagdata) == 3) {     //已过期
                title_text = '很遗憾，礼物已经过期'
                ishowSpebtn=true
                other_text = ''
                ishideodds=true
                ishideodds1=true
              }
            }
            that.setData({
              title_text,
              gift_detail,
              ishideodds,
              ishideodds1,
              gifts: gift_detail.gifts,
              winList: gift_detail.win || '',
              isfinish,
              ismy,
              ismyOneContinue,
              heads: gift_detail.client,
              ismyBtntext,
              isreceivePerson,
              ishave,
              other_text,
              ismy2haveBtntext,
              ishowSpebtn,
              isshowWhite,
              shareTitle,
              shareTitle1
            })
            that.drawText(gift_detail.wish, gift_detail.condition)
          }
        }).catch((error)=>{
          console.log(error)
        })
      }
      console.log(postData)
      
    }


  },

  //画图
  drawImg:function(){
    if(this.data.gifts.length<=3){
      var that = this
      console.log(that.getimginfo(that.data.gifts[0].image))
      that.getimginfo(that.data.gifts[0].image).then((res)=>{
        console.log(res)
        ctx.drawImage(res.path, 20, 230, 120, 120)
        ctx.rect(140, 230, 330, 120)
        ctx.setFillStyle('#fff')
        ctx.fill()
        ctx.setTextAlign('left')
        ctx.setFillStyle("#000")
        var word = that.data.gifts[0].name
        word = word.length > 10 ? word.substring(0, 10) + '...' : word
        ctx.fillText(word, 170, 280)
        ctx.fillText('x' + that.data.gifts[0].num, 170, 320)
        that.canvasDraw()
        
      }).catch((error)=>{
        that.drawImg()
        console.log(error)
      })
    }
    else{
      var that=this
      Promise.all([
        that.getimginfo(that.data.gifts[0].image),
        that.getimginfo(that.data.gifts[1].image),
        that.getimginfo(that.data.gifts[2].image)
      ]).then((res)=>{
        ctx.drawImage(res[0].path, 20, 230, 120, 120)
        ctx.drawImage(res[1].path, 150, 230, 120, 120)
        ctx.drawImage(res[2].path, 280, 230, 120, 120)
        ctx.fillStyle = "#da0202";
        ctx.setFontSize(24)
        ctx.setTextAlign('left')
        ctx.font='normal bold 24px sans-serif'
        ctx.fillText("···", 410, 300)
        that.canvasDraw()
        }).catch((error) => {
          console.log(error)
          that.drawImg()
        })
    }
    

  },
  

  //画字
  drawText:function(wish,condition){
    console.log(wish)
    console.log(condition)
    var wishes = wish ? wish : '恭喜发财，大吉大利。'
    ctx.setFillStyle('#f2f2f2')
    ctx.fillRect(0, 0, 500, 400)
    ctx.setStrokeStyle('#da0202')
    ctx.setLineWidth(8)
    ctx.strokeRect(4, 4, 488, 392)
    ctx.setFontSize(32)
    ctx.setTextAlign('center')
    ctx.setFillStyle('#da0202')
    ctx.fillText('“' + wishes+ '”', 250, 100)
    ctx.setFontSize(24)
    ctx.fillText(condition, 250, 160)
    this.drawImg()
  },


  //画canvas
  canvasDraw:function(){
    var that=this
    ctx.draw(false,function(e){
      if (e.errMsg =='drawCanvas:ok'){
        setTimeout(function () {
          wx.canvasToTempFilePath({
            canvasId: 'myCanvas',
            success: function (res) {
              console.log(res.tempFilePath)
              that.setData({
                // shareTitle: that.data.gift_detail.uname+'赠送给你一种礼物',
                shareImg: res.tempFilePath,
                // sharePath:'pages/index/index'
              })

              wx.hideLoading()
              wx.showShareMenu({

              })

            },

          }, this)
        }, 0)
      }
      else{
        console.log(1111)
        that.canvasDraw()
      }
    })
  },


  //获取图片信息
  getimginfo:function(img){
    var promise = new Promise((resolve, reject)=>{
      wx.getImageInfo({
        src: img,
        success:function(res){
          resolve(res)
        },
        fail:function(error){
          reject(error);
        }
      })
    })
    return promise
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
  onShareAppMessage: function (res) {
    if (this.data.ishowSpebtn == true || this.data.ismyOneContinue == true){
      console.log('首页')
      return app.commonShare()
      // wx.hideShareMenu({
      //   success:function(res){
      //     console.log(res)
      //   }
      // })
    }
    else{
      return {
        title:this.data.shareTitle+this.data.shareTitle1,
        path: 'pages/raffle/raffle?order_id=' + this.data.gift_detail.id + '&inviter=' + uid + '&source=lottery',
        imageUrl:this.data.shareImg
      }
      // ctx.drawImage()
      
    }

  },


  //去首页||我也要送礼
  goIndex:function(){
    wx.reLaunch({
      url: '../index/index',
    })
  },

  //参与更多抽奖||去官网抽奖页
  joinMore:function(){
    wx.reLaunch({
      url: '../lottery/lottery',
    })
  },
  

  //去礼物栏查看
  goMy:function(){
    wx.switchTab({
      url: '../my/my',
    })
  },
  
  //查看更多人参与
  gojoinPeople:function(){
    // console.log(uid)
    if(this.data.heads.length==0){
      return
    }
    wx.navigateTo({
      url: '../joinpeople/joinpeople?order_id='+order_id+'&uid='+uid,
    })
  },

  a:function(){},

  //banner点击事件
  bannerTap: function (e) {
    app.bannerGo(e)
  },

  gojoinPeople2:function(){
    if (this.data.gift_detail.inviter.length == 0) {
      return
    }
    wx.navigateTo({
      url: '../joinpeople/joinpeople?order_id=' + order_id + '&uid=' + uid+'&inviter='+uid,
    })
  },

  canvasImgLoad:function(e){
    console.log(e)
  }

})