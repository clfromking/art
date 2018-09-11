// pages/components/my-component.js
const app=getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:'哥送艺术'
    },
    color:{
      type:String,
      value:'red'
    },
    isback:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    barHeight: app.globalData.barHeight,
    textHeight: app.globalData.textHeight,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goBack:function(){
      wx.navigateBack({
        
      })
    }
  }
})
