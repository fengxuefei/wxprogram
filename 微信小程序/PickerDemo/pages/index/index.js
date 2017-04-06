// pages/index/index.js
Page({
  data:{
    dataList:['tom','jesse','sunny','mirror'],
    index:0,
    time:"20:00",
    date:"2017-02-16"
  },
  dateSelectorChanged:function(e){
    console.log(e)
    var date = e.detail.value
    this.setData({
      date:date
    })
  },
  timeSelectorChanged:function(e){
    console.log(e)
    var time = e.detail.value
    this.setData({
      time: time
    })
  },
  selectorChanged:function(e){
    console.log(e)
    var index = e.detail.value
    this.setData({
      index:index
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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