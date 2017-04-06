// pages/index/index.js
Page({
  data:{
    firstSwitch: false,
    secondSwitch: true,
    textValue: '关'
  },
  changeSwitch:function(e){
    console.log(e);
    console.log(e.detail.value?'开':'关');
    this.setData(
      {
        firstSwitch: e.detail.value,
        secondSwitch: !e.detail.value,
        textValue: e.detail.value?'开':'关'
      }
    )
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