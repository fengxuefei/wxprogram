// pages/index/index.js
Page({
  data:{
    isPlain:false,
    disabled:false,
    loading:false
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
  },
  changePlain:function(){
    this.setData(
      {
        isPlain:~this.data.isPlain
      }
    )
  },
  changeDisabled:function(){
    this.setData(
      {
        disabled:~this.data.disabled
      }
    )
  },
  changeLoading:function(){
    this.setData(
      {
        loading:~this.data.loading
      }
    )
  }
})