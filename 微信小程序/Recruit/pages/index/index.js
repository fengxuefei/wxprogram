// pages/index/index.js
var util = require("../../common/js/util.js")
const getDepartmentUrl = 'https://www.kpi365.com/smartx/webapi/service/aolc/GetDepartment/'
const updateRecruitUrl = 'https://www.kpi365.com/smartx/webapi/service/aolc/UpdateRecruitInfo/'
Page({
  data: {
    name: '',
    job: [],
    jobindex: 0,
    recruittype: ['社招', '校招'],
    recruittypeindex: 0,
    showTopTips: false,
    toptipinform: '系统错误提示',
    userInfo: {},
    inviter: "",
    organizationId: "",
    recruitTime: "",
    recruitinfoid: ""
  },
  inputnamechange: function (e) {
    var name = e.detail.value
    this.setData({
      name: name
    })
  },
  bindjobchange: function (e) {
    var index = e.detail.value
    this.setData({
      jobindex: index
    })
  },
  bindclear: function (e) {
    this.setData({
      name: ''
    })
  },
  gointerview: function (e) {
    var that = this
    if (this.data.name == '') {
      this.setData({
        showTopTips: true,
        toptipinform: '请输入姓名'
      })
      setTimeout(function () {
        that.setData({
          showTopTips: false
        });
      }, 3000)
      return
    }
    if (this.data.job[this.data.jobindex] == null) {
      this.setData({
        showTopTips: true,
        toptipinform: '未获取到岗位信息，请联系管理员'
      })
      setTimeout(function () {
        that.setData({
          showTopTips: false
        });
      }, 3000)
      return
    }

    var job = that.data.job[that.data.jobindex], recruittype = that.data.recruittype[that.data.recruittypeindex], name = that.data.name,
      inviter = that.data.inviter, organizationId = that.data.organizationId,
      recruitTime = that.data.recruitTime,
      userInfo = that.data.userInfo

    var requestData = {
      "name": name,
      "job": job,
      "recruittype": recruittype,
      "recruitinfoid": this.data.recruitinfoid,
      "inviter": inviter,
      "organizationId": organizationId,
      "recruitTime": recruitTime,
      "userInfo": userInfo
    }
    wx.request({
      url: updateRecruitUrl,
      data: requestData,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        var recruitinfoid
        if (res != null) {
          recruitinfoid = res.data.datas.data
        }
        wx.setStorage({
          key: 'aolc_recruitinfoid',
          data: recruitinfoid,
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
        wx.redirectTo({
          url: '../introduction/introduction?name=' + that.data.name,
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
        util.showTopTips(that,'网络异常')
      },
      complete: function () {
        // complete
      }
    })
  },
  bindrecruittypechange: function (e) {
    var index = e.detail.value
    this.setData({
      recruittypeindex: index
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    var inviter = options.inviter
    var organizationId = options.organizationId
    var recruitTime = util.getNowFormatDate()

    wx.request({
      url: getDepartmentUrl,
      data: {
        organizationId: organizationId
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (resource) {
        // success
        var jobs = resource.data.datas.data.departments
        that.setData({
          inviter: inviter,
          recruitTime: recruitTime,
          organizationId: organizationId,
          job: jobs
        })
        wx.getStorage({
          key: 'aolc_recruitinfoid',
          success: function (res) {
            // success
            that.setData({
              recruitinfoid: res.data
            })
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          }
        })
        wx.login({
          success: function (res) {
            // success
            wx.getUserInfo({
              success: function (res) {
                // success
                that.setData({
                  userInfo: res.userInfo
                })
                console.log(res.userInfo)
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
          showTopTips: true,
          toptipinform: '网络异常'
        })
        setTimeout(function () {
          that.setData({
            showTopTips: false
          });
        }, 3000)
      },
      complete: function () {
        // complete
      }
    })
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