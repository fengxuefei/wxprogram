// pages/index/index.js
Page({
  data:{
    zblist:[]
  },
  onPullDownRefresh:function(e){
    var that = this
    wx.request({
      url: 'http://lolbox.duowan.com/phone/apiZBCategory.php',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        that.setData({
          zblist : res.data
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
        wx.stopPullDownRefresh()
      }
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.onPullDownRefresh()
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})