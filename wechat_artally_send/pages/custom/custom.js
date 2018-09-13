// pages/custom/custom.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questions:[]
  },
  // 打电话
  callphone: function () {
    wx.makePhoneCall({
      phoneNumber: '4009001813'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      questions: [{ 'image': 'https://pic.forunart.com/artgive/wx/liwulingqu@3x.png', 'name': '礼物领取', 'describe': '发出的礼物72小时内未被领取，将在72小时后自动退还到原账户内。' }, { 'image': 'https://pic.forunart.com/artgive/wx/qiyedingzhi@3x.png', 'name': '企业定制', 'describe': '专属艺术顾问为您推荐客户答谢礼、员工节日礼等，欢迎在线咨询或致电艺术顾问。' }, { 'image': 'https://pic.forunart.com/artgive/wx/kefufuwu@3x.png', 'name': '客服服务', 'describe': '客服在线时间为周一到周日的9:00-23:00，若出现修改地址、查询快递、商品质量、退换货情况，请联系在线客服，或拨打客服热线电话，我们将竭诚为您服务。' }, { 'image': 'https://pic.forunart.com/artgive/wx/kuaidishouhou@3x.png', 'name': '快递售后', 'describe': '若您的礼物出现配送、签收、折现、质量、退换货等问题，请联系或者留言，我们将及时为您受理并解决。' }, { 'image': 'https://pic.forunart.com/artgive/wx/gongjushiyong@3x.png', 'name': '工具使用', 'describe': '小程序使用过程中的礼物玩法、收礼疑惑、故障审告等问题，欢迎在线咨询或致电艺术顾问。' }, { 'image': 'https://pic.forunart.com/artgive/wx/qitayihuo@3x.png', 'name': '其他疑惑', 'describe': '不论您有任何需要，无论何时何地，我们的礼品顾问在此随时恭候您的大驾光临，竭诚为您服务。' }]
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