// pages/index/index.js
var common = require('../common/common.js');
var page = 1;

Page({
  data: {
    newslist: [],
    toplist: []
  },
  onReachBottom: function () {
    console.log('safsdf')
    if (this.data.newslist.length == 0) {
      return;
    }
    var that = this
    wx.request({
      url: 'http://box.dwstatic.com/apiNewsList.php?action=l&newsTag=headlineNews&p=' + page + 1,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        page += 1

        for(var i=0;i<res.data.data.length;i++){
          var time = res.data.data[i].time*1000;
          res.data.data[i].time = common.getDateDiff(time);
        }

        that.setData({
          newslist: that.data.newslist.concat(res.data.data),
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  onPullDownRefresh: function () {
    var that = this
    wx.request({
      url: 'http://box.dwstatic.com/apiNewsList.php?action=l&newsTag=headlineNews&p=1',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res)
        page = 1

        for(var i=0;i<res.data.data.length;i++){
          var time = res.data.data[i].time*1000;
          res.data.data[i].time = common.getDateDiff(time);
        }

        console.log(res)
        that.setData({
          newslist: res.data.data,
          toplist: res.data.headerline
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
        wx.stopPullDownRefresh()
      }
    })
  },
  onShareAppMessage:function(){
    return {
      title: '头条资讯',
      path: '/pages/index/index'
    }

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.onPullDownRefresh()
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})