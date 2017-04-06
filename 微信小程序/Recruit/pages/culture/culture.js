// pages/culture/culture.js
const getQuestions = 'https://www.kpi365.com/smartx/webapi/service/aolc/GetQuestions/'
const uploadCulture = 'https://www.kpi365.com/smartx/webapi/service/aolc/UploadAnswers/'
var util = require("../../common/js/util.js")
Page({
  data: {
    testpaper: [],
    currentindex: 0,
    btnstatus: false,
    showLoading: true
  },
  radioChange: function (e) {
    var testpaper = this.data.testpaper
    var currentindex = this.data.currentindex
    var answers = testpaper[currentindex].answers
    var btnstatus = false
    for (var i = 0, len = answers.length; i < len; ++i) {
      answers[i].checked = answers[i].value == e.detail.value;
      btnstatus = answers[i].checked ? true : btnstatus
    }
    testpaper[currentindex].answers = answers
    this.setData({
      testpaper: testpaper,
      btnstatus: btnstatus
    });
  },
  checkboxChange: function (e) {
    var testpaper = this.data.testpaper
    var currentindex = this.data.currentindex
    var answers = testpaper[currentindex].answers;
    var values = e.detail.value;
    var btnstatus = false
    for (var i = 0, lenI = answers.length; i < lenI; ++i) {
      answers[i].checked = false;
      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (answers[i].value == values[j]) {
          answers[i].checked = true;
          btnstatus = true
          break;
        }
      }
    }
    this.setData({
      testpaper: testpaper,
      btnstatus: btnstatus
    });
  },
  nextquestion: function (e) {
    console.log(e)
    var that = this
    var nextindex = parseInt(this.data.currentindex) + 1
    if (nextindex < this.data.testpaper.length) {
      this.setData({
        currentindex: nextindex,
        btnstatus: false
      })
    }

    if (nextindex >= this.data.testpaper.length) {
      //上传数据

      wx.getStorage({
        key: 'aolc_recruitinfoid',
        success: function (res) {
          // success
          var recruitinfoid = res.data
          wx.request({
            url: uploadCulture,
            data: {
              recruitinfoid: recruitinfoid,
              category: 'culture',
              testpaper: that.data.testpaper
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
              // success
              // 获取专业技能的数据并保持到本地
              that.setData({
                showLoading: true
              })
              wx.request({
                url: getQuestions,
                data: {
                  recruitinfoid: recruitinfoid,
                  category: 'professional'
                },
                method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                // header: {}, // 设置请求的 header
                success: function (res) {
                  // success
                  console.log(res)
                  var testpaper = res.data.datas.data.testpaper
                  var currentindex = res.data.datas.data.currentindex
                  var url = '../professionaldone/professionaldone'
                  if (testpaper != null) {
                    url = '../professional/professional'
                    wx.setStorage({
                      key: 'recruit_data_professional',
                      data: {
                        testpaper: testpaper,
                        currentindex: currentindex
                      },
                      success: function (res) {
                        // success
                      },
                      fail: function () {
                        // fail
                      },
                      complete: function () {
                        // complete
                      }
                    })
                  }
                  wx.redirectTo({
                    url: url,
                    success: function (res) {
                      // success
                      wx.removeStorage({
                        key: 'recruit_data_culture',
                        success: function (res) {
                          // success
                        },
                        fail: function () {
                          // fail
                        },
                        complete: function () {
                          // complete
                        }
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
                fail: function () {
                  // fail
                  that.setData({
                    showLoading: false
                  })
                  util.showTopTips(that,'网络异常')
                },
                complete: function () {
                  // complete
                }
              })
            },
            fail: function () {
              // fail
              util.showTopTips(that,'网络异常')
            },
            complete: function () {
              // complete
            }
          })
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    } else {
      wx.setStorage({
        key: 'recruit_data_culture',
        data: that.data,
        success: function (res) {

        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    if (options.isFirstTime) {
      wx.request({
        url: getQuestions,
        data: {
          recruitinfoid: options.recruitinfoid,
          category: 'culture'
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          // success
          var testpaper = res.data.datas.data.testpaper
          var currentindex = res.data.datas.data.currentindex
          that.setData({
            testpaper: testpaper,
            currentindex: currentindex,
            showLoading: false
          })
          wx.setStorage({
            key: 'recruit_data_culture',
            data: {
              testpaper: testpaper,
              currentindex: currentindex
            },
            success: function (res) {
              // success
            },
            fail: function () {
              // fail
            },
            complete: function () {
              // complete
            }
          })
        },
        fail: function () {
          // fail
          util.showTopTips(that, '网络异常')
        },
        complete: function () {
          // complete
        }
      })
    } else {
      wx.getStorage({
        key: 'recruit_data_culture',
        success: function (res) {
          // success
          if (res.data !== undefined) {
            that.setData({
              testpaper: res.data.testpaper,
              currentindex: res.data.currentindex
            })
          }
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }
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