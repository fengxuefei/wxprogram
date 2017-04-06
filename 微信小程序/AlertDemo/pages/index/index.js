// pages/index/index.js
Page({
  data:{
    toastTitle:"显示toast"
  },
  showToast:function(e){
    console.log(e)
    var that = this
    wx.showToast({
      title:"hello",
      icon:"loading",
      duration:5000,
      success:function(e){
        console.log("success");
        that.setData({
          toastTitle:"success"
        })
      },
      fail:function(e){
        console.log("fail")
      },
      complete:function(e){
        console.log("complete")
      }
    })
    setTimeout(function(){
      wx.hideToast()
      console.log("超时")
    },3000)
  },
  showModal:function(e){
    console.log(e);
    wx.showModal({
      title:"welcome",
      content:"wish everyone a happy day",
      // showCancel:false
      cancelText:'no',
      confirmText:'yes',
      confirmColor:"#ff0000",
      success:function(e){
        console.log(e)
        var value = e.confirm
        console.log(value==0?'点了取消':'点了确定')
      }
    })
  },
  showActionSheet:function(e){
    console.log(e)
    wx.showActionSheet({
      itemList:['从相册获取','拍照获取'],
      itemColor:"#ff0000",
      success:function(e){
        console.log(e)
        var cancel = e.cancel
        console.log(cancel?"点了取消":"没有点")
        if(!cancel){
          var tapIndex = e.tapIndex
          var msg
          if(tapIndex == 0){
            msg = "从相册获取"
          }
          if(tapIndex == 1){
            msg = "拍照获取"
          }
          console.log(msg)
        }
      }
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