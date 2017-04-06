// pages/loading/loading.js
Page({
  data:{
    inid:''
  },
  fleshstatus:function(){
    wx.request({
      url: 'https://www.baidu.com',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        if(res.errMsg=='request:ok'){
          wx.redirectTo({
            url: '../introduction/introduction',
            success: function(res){
              // success
              console.log("tiao zhuan success")
            },
            fail: function() {
              // fail
            },
            complete: function() {
              // complete
            }
          })
        }
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(res)
    // wx.request({
    //   url: uploadInfoUrl,
    //   data: datas,
    //   method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   success: function (res) {
    //     // success
    //     wx.redirectTo({
    //       url: '../culture/culture?isFirstTime=true&recruitinfoid='+recruitinfoid,
    //       success: function (res) {
    //         // success
    //       },
    //       fail: function () {
    //         // fail
    //       },
    //       complete: function () {
    //         // complete
    //       }
    //     })
    //   },
    //   fail: function () {
    //     // fail
    //     util.showTopTips(that,'网络异常')
    //   },
    //   complete: function () {
    //     // complete
    //   }
    // })
  },
  onReady:function(){
    // 页面渲染完成
    var inid = setInterval(this.fleshstatus,5000)
    this.setData({
      inid:inid
    })
  },
  onShow:function(){
    // 页面显示
    
  },
  onHide:function(){
    // 页面隐藏
    
  },
  onUnload:function(){
    // 页面关闭
    clearInterval(this.data.inid)
  }
})