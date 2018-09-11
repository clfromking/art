// pages/mall/mall.js
const app=getApp()
let swiper_msgs = []

let ware_list = []

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner_src: [],
    swiper_msgs:swiper_msgs,
    ware_list:ware_list,
    inputCancel_ishide:true,
    input_val:'',
    swiper_block:[],
    isshowIndicator:true,
    swiper_block_width:''
  },
  search_input_focus:function(){
    this.setData({
      inputCancel_ishide: false
    })
  },
  //搜索框失焦
  search_input_blur: function () {
    this.setData({
      inputCancel_ishide: true
    })
  },

  //搜索框输入
  search_input:function(e){
    this.setData({
      input_val:e.detail.value
    })
  },

  clearInput:function(){
    this.setData({
      input_val: '',
      inputCancel_ishide: true,
    })
    
  },

  //点击搜索
  search_msg:function(){
    console.log(this.data.input_val)
    var that=this
    app.post('gifts/lists',{'search':this.data.input_val}).then((res)=>{
      console.log(res)
      if(res.code==200){
        if(res.data.lists.length<=0){
          that.setData({
            ware_list:''
          })
        }
        else{
          that.setData({
            ware_list:res.data.lists
          })
        }
      }
    }).catch((error)=>{
      console.log(error)
    })
  },


  //去商品详情
  goDetail:function(e){
    wx.navigateTo({
      url: '../hintDetail/hintDetail?id='+e.currentTarget.dataset.id,
    })
  },

  gomallAll:function(){
    // wx.navigateTo({
    //   url: '../mallAll/mallAll',
    // })
    wx.redirectTo({
      url: '../mallAll/mallAll',
    })
  }, 

  //swiper改变时事件
  changeSwiper:function(e){
    var swiper_block = this.data.swiper_block
    for(var i=0;i<swiper_block.length;i++){
      swiper_block[i]=false
    }
    swiper_block[e.detail.current]=true
    this.setData({
      swiper_block
    })
  },

  //点击轮播去专题页
  goSubject:function(e){
    switch (Number(e.currentTarget.dataset.go)) {
      case 1:
        break;
      case 2:
        wx.reLaunch({
          url: '../index/index',
        })
        break;
      case 3:
        wx.navigateTo({
          url: '../hintDetail/hintDetail?id='+e.currentTarget.dataset.go_id,
        })
        break;
      case 4:
        wx.navigateTo({
          url: '../raffle/raffle?id=' + e.currentTarget.dataset.go_id,
        })
        break;
      case 5:
        wx.navigateTo({
          url: '../subject/subject?id=' + e.currentTarget.dataset.go_id,
        })
        break;
      case 6:
        break;
    }
  },
  
  //标签筛选
  labelScreen:function(e){
    wx.navigateTo({
      url: '../subject/subject?id='+e.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    app.post('banner/lists',{'position':2}).then((res) => {
      console.log(res)
      var swiper_block=[]
      if (res.code == 200) {
        for(var i=0;i<res.data.business_list.length;i++){
          if(i==0){
            swiper_block[i]=true
          }
          else{
            swiper_block[i] = false
          }
        }
        
        that.setData({
          banner_src:res.data.business_list,
          swiper_block:swiper_block,
          swiper_block_width: 15 * res.data.business_list.length + 20 * (res.data.business_list.length-1)+1+'rpx'
        })
      }
    }).catch((error) => {
      console.log(error)
    })
    app.post('gifts/subjects').then((res)=>{
      console.log(res)
      if(res.code==200){
          if(res.data.tags.length<=8){
            that.setData({
              isshowIndicator:false
            })
          }
          var page_num=Math.ceil(res.data.tags.length/8)
          // console.log(page_num)
          for(var i=0;i<page_num;i++){
            swiper_msgs[i]=[]
            for(var j=i*8;j<8*(i+1);j++){            
              if(res.data.tags[j]==undefined){
              }
              else{
                swiper_msgs[i].push(res.data.tags[j])
              }
            }
          }

          console.log(swiper_msgs)
          that.setData({swiper_msgs})
      }
    }).catch((error)=>{
      console.log(error)
    })
    var data={"hot":1}
    app.post('gifts/lists',data).then((res)=>{
      if(res.code==200){
        ware_list=res.data.lists
        that.setData({
          ware_list
        })
        
      }
    }).catch((error)=>{
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
  
  },

  getFormid: function (e) {

    app.data.formIds.push(e.detail.formId)
    console.log(app.data.formIds)
  },

})