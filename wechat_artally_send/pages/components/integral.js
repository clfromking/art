// pages/components/integral.js
const app=getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ishide: {
      type: Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    iscontrolhide:false
    // ishide:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    receive:function(){ 
      // app.islogin().then((res)=>{
      //   console.log(res)
      // })
      var that=this
      wx.getStorage({
        key: 'userInfo',
        success: function (res) {
          console.log(res)
          that.setData({
            iscontrolhide: true
          })
          app.post('grade/add', { "uid": res.data.uid, "type": "login" }).then((res1) => {
            console.log(res1)
            if(res1.code!==200){
              return
            }
            app.post('grade/cat', { "uid": res.data.uid}).then((res)=>{
              console.log(res)
              wx.showToast({
                title: '领取成功',
                icon: 'none',
                success: function () {
                  app.globalData.ishideIntegral = true
                  app.globalData.integralNum = res.data
                  that.triggerEvent('myevent', {"aa":"aa"})
                  
                }
              })
            }).catch((error)=>{
              console.log(error)
            })
            
            
          }).catch((error) => {
            console.log(error)
          })
          
        },
        fail: function () {
          wx.navigateTo({
            url: '../author/author?scene=integral',
          })
        }
      })
      // app.globalData.ishideIntegral=true
      
    },
    closeIntegral:function(){
      console.log(this.properties.ishide)
      app.globalData.ishideIntegral = true
      this.setData({
        iscontrolhide:true
      })
      // this.properties.ishide=true
    }
  }
})
