// pages/mall/mall.js
const app=getApp()
let swiper_msgs = [[{ 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她1' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她' }], [{ 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她2' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_label_her.png', 'alt': '送她' }]]

let ware_list = [{ 'src': 'https://pic.forunart.com/artgive/wx/home_way_icon_gift.png', 'alt': '《蒙娜丽莎》雕塑', 'money': '2,000', 'id': '1' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'alt': '《蒙娜丽莎》雕塑', 'money': '2,000', 'id': '1' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'alt': '《蒙娜丽莎》雕塑', 'money': '2,000', 'id': '1' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'alt': '《蒙娜丽莎》雕塑', 'money': '2,000', 'id': '1' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'alt': '《蒙娜丽莎》雕塑', 'money': '2,000', 'id': '1' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'alt': '《蒙娜丽莎》雕塑', 'money': '2,000', 'id': '1' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'alt': '《蒙娜丽莎》雕塑', 'money': '2,000', 'id': '1' }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'alt': '《蒙娜丽莎》雕塑', 'money': '2,000', 'id': '1' }]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner_src: [{ 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'id': 0 }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'id': 1 }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'id': 2 }, { 'src': 'https://pic.forunart.com/artgive/wx/mall_banner_img.png', 'id': 3 }],
    swiper_msgs:swiper_msgs,
    ware_list:ware_list,
    inputCancel_ishide:true,
    input_val:'',
    swiper_block:[true,false,false,false]
  },
  search_input_focus:function(){
    this.setData({
      inputCancel_ishide: false
    })
  },
  clearInput:function(){
    
    this.setData({
      input_val: '',
      inputCancel_ishide: true,
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
    wx.navigateTo({
      url: '../subject/subject?id='+e.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    app.post('gifts/tags').then((res)=>{
      if(res.data.code==200){
          var page_num=Math.ceil(res.data.data.tags.length/8)
          // console.log(page_num)
          for(var i=0;i<page_num;i++){
            swiper_msgs[i]=[]
            for(var j=i*8;j<8*(i+1);j++){            
              if(res.data.data.tags[j]==undefined){
              }
              else{
                swiper_msgs[i].push(res.data.data.tags[j])
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
      if(res.data.code==200){
        ware_list=res.data.data.lists
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
  
  }
})