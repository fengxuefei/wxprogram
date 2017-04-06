// pages/index/index.js
Page({
  data:{
    item_id:"purple"
  },
  scrolltoupper:function(e){
    console.log(e)
  },
  scrolltolower:function(e){
    console.log(e)
  },
  changeItem:function(e){
    this.setData({
      item_id:"blue"
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