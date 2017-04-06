// pages/detail/detail.js
Page({
  data:{
    tag:'',
    zbitems:[]
  },
  onPullDownRefresh:function(e){
    var that = this
    wx.request({
      url: 'http://lolbox.duowan.com/phone/apiZBItemList.php?tag='+that.data.tag,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        that.setData({
          zbitems:res.data
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
    this.setData({
      tag : options.tag
    })
    this.onPullDownRefresh()
    console.log(this.data.tag)
    wx.setNavigationBarTitle({
      title: options.title,
      success: function(res) {
        // success
      }
    })
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