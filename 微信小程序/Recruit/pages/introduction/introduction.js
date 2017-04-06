// pages/introduction/introduction.js
var util = require("../../common/js/util.js")
const getInfoUrl = 'https://www.kpi365.com/smartx/webapi/service/aolc/GetApplicantInfo/'
const uploadInfoUrl = 'https://www.kpi365.com/smartx/webapi/service/aolc/UpdateApplicantInfo/'
Page({
  data: {
    name: '',
    sex: ['女', '男'],
    sexindex: 0,
    origin: '',
    marry: ['未婚', '已婚未育', '已婚已育', '保密'],
    marryindex: 0,
    cardid: '',
    telephone: '',
    education: ['本科', '专科', '博士研究生', '硕士研究生'],
    educationindex: 0,
    language: ['英语熟练', '英语流畅', '具备其他语种能力'],
    languageindex: 0,
    school: '',
    professional: '',
    email: '',
    company: '',
    job: '',
    favorites: [],
    checkednum: 0,
    works: [['一', '', '', '', '']],
    showTopTips: false,
    toptipinform: '系统错误提示',
    recruitinfoid: null
  },
  inputemailchange: function (e) {
    var value = e.detail.value
    var emailRegex = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
    var toptip4email = '请填写有效Email'

    if (util.showCompErr(value, emailRegex, this, toptip4email)) {
      this.setData({
        email: value
      })
      util.uploadApplicant(this, uploadInfoUrl)
    } else {
      this.setData({
        email: ''
      })
    }

  },
  inputnamechange: function (e) {
    var value = e.detail.value
    this.setData({
      name: value
    })
    util.uploadApplicant(this, uploadInfoUrl)
  },
  bindsexchange: function (e) {
    this.setData({
      sexindex: parseInt(e.detail.value),
    })
    util.uploadApplicant(this, uploadInfoUrl)
  },
  inputoriginchange: function (e) {
    var value = e.detail.value
    this.setData({
      origin: value
    })
    util.uploadApplicant(this, uploadInfoUrl)
  },
  bindmarrychange: function (e) {
    this.setData({
      marryindex: e.detail.value
    })
    util.uploadApplicant(this, uploadInfoUrl)
  },
  inputcardidchange: function (e) {
    var value = e.detail.value
    var that = this
    var IDRegex15 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/
    var IDRegex18 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
    var toptip4IDcard = '请填写有效身份证号码'
    if (util.matchExp(value, IDRegex15) || util.matchExp(value, IDRegex18)) {
      this.setData({
        cardid: value
      })
      util.uploadApplicant(this, uploadInfoUrl)
    } else {
      that.setData({
        showTopTips: true,
        toptipinform: toptip4IDcard,
        cardid: ''
      })
      setTimeout(function () {
        that.setData({
          showTopTips: false
        });
      }, 3000)
    }
  },
  checkIDCard: function () {
    var that = this
    var IDRegex15 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/
    var IDRegex18 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
    var toptip4IDcard = '请填写有效身份证号码'
    var value = this.data.cardid
    if (util.matchExp(value, IDRegex15) || util.matchExp(value, IDRegex18)) {
      return true
    } else {
      that.setData({
        toptipinform: toptip4IDcard,
        showTopTips: true
      })
      setTimeout(function () {
        that.setData({
          showTopTips: false
        });
      }, 3000)
      return false
    }
  },
  bindeducationchange: function (e) {
    this.setData({
      educationindex: e.detail.value
    })
    util.uploadApplicant(this, uploadInfoUrl)
  },
  bindlanguagechange: function (e) {
    this.setData({
      languageindex: e.detail.value
    })
    util.uploadApplicant(this, uploadInfoUrl)
  },
  inputschoolchange: function (e) {
    var value = e.detail.value
    this.setData({
      school: value
    })
    util.uploadApplicant(this, uploadInfoUrl)
  },
  inputprofessionalchange: function (e) {
    var value = e.detail.value
    this.setData({
      professional: value
    })
    util.uploadApplicant(this, uploadInfoUrl)
  },
  inputtelephonechange: function (e) {
    var value = e.detail.value
    var telRegex = /^1[0-9]{10}$/
    var toptip4tel = "请填写有效的手机号码"

    if (util.showCompErr(value, telRegex, this, toptip4tel)) {
      this.setData({
        telephone: value
      })
      util.uploadApplicant(this, uploadInfoUrl)
    } else {
      this.setData({
        telephone: ''
      })
    }
  },
  inputcompanychange: function (e) {
    var index = parseInt(e.currentTarget.id.split('_')[1])
    var value = e.detail.value
    var work = this.data.works
    work[index][1] = value
    this.setData({
      works: work
    })
    util.uploadApplicant(this, uploadInfoUrl)
  },
  inputjobchange: function (e) {
    var index = parseInt(e.currentTarget.id.split('_')[1])
    var value = e.detail.value
    var work = this.data.works
    work[index][2] = value
    this.setData({
      works: work
    })
    util.uploadApplicant(this, uploadInfoUrl)
  },
  binddatechange: function (e) {
    var that = this
    var eventid = e.currentTarget.id
    var datetype = eventid.split("_")[0]
    var index = eventid.split("_")[1]
    var date = e.detail.value
    var works = this.data.works
    if (!util.checkdateValid(date)) {
      that.setData({
        toptipinform: '请选择真实时间',
        showTopTips: true
      })
      setTimeout(function () {
        that.setData({
          showTopTips: false
        });
      }, 3000)
      return
    }
    if (datetype == 'startdate') {
      works[index][3] = date
    }
    if (datetype == 'enddate') {
      works[index][4] = date
    }

    this.setData({
      works: works
    })
    if (util.checkdate(works[index][3], works[index][4])) {
      util.uploadApplicant(this, uploadInfoUrl)
    }
  },
  addwork: function (e) {
    var newwork;
    var works = this.data.works
    var leng = works.length
    switch (leng) {
      case 1:
        newwork = [['二', '', '', '', '']];
        break;
      case 2:
        newwork = [['三', '', '', '', '']];
        break;
      case 3:
        newwork = [['四', '', '', '', '']];
        break;
      case 4:
        newwork = [['五', '', '', '', '']];
        break;
      default:
        return;
    }
    var newworks = works.concat(newwork)
    this.setData({
      works: newworks
    })
  },
  favoriteschange: function (e) {
    var favorites = this.data.favorites, values = e.detail.value;
    for (var i = 0, lenI = favorites.length; i < lenI; ++i) {
      favorites[i].checked = 'false';

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (favorites[i].value == values[j]) {
          favorites[i].checked = 'true';
          break
        }
      }
    }

    this.setData({
      favorites: favorites
    })
  },
  showTopTips: function (checkedarg, tiptop) {
    var that = this
    if (!checkedarg) {
      this.setData({
        showTopTips: true,
        toptipinform: tiptop
      })
      setTimeout(function () {
        that.setData({
          showTopTips: false
        });
      }, 3000)
      return false
    }
    return true
  },
  checkworks: function (works) {
    var that = this
    var workstip = '请将工作经历填写完整', datetip = '开始时间应小于结束时间'
    var flag = true
    var tiptop
    for (var i = 0; i < works.length; i++) {
      for (var j = 0; j < works[i].length; j++) {
        if (works[0][j] == '') {
          tiptop = workstip
          flag = false
          break
        }
        if (!util.checkdate(works[i][3], works[i][4])) {
          tiptop = datetip
          flag = false
          break
        }
      }
    }
    if (!flag) {
      this.setData({
        showTopTips: true,
        toptipinform: tiptop
      })
      setTimeout(function () {
        that.setData({
          showTopTips: false
        });
      }, 3000)
      return false
    }
    return true
  },
  checkfavorites: function (favorites, tiptop) {
    var that = this
    for (var i = 0; i < favorites.length; i++) {
      if (favorites[i].checked) {
        return true
      }
    }
    this.setData({
      showTopTips: true,
      toptipinform: tiptop
    })
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000)
    return false
  },
  checkform: function () {
    var name = this.data.name, origin = this.data.origin,
      cardid = this.data.cardid, telephone = this.data.telephone,
      school = this.data.school, professional = this.data.professional, email = this.data.email
    var works = this.data.works
    var favorites = this.data.favorites
    var telRegex = /^1[0-9]{10}$/, emailRegex = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
    var nametip = '姓名为必填项', origintip = '籍贯必填项',
      cardidtip = '身份证号码为必填项', telephonetip = '手机号码为必填项',
      favoritestip = '兴趣特长为必填项', professionaltip = '专业名为必填项',
      schooltip = '学校名为必填项', emailtip = '邮箱为必填项', toptip4tel = "请填写有效的手机号码", toptip4email = '请填写有效Email'
    return this.showTopTips(name, nametip) && this.showTopTips(origin, origintip) && this.showTopTips(cardid, cardidtip) && this.showTopTips(telephone, telephonetip) && this.showTopTips(email, emailtip) && this.showTopTips(school, schooltip) && this.showTopTips(professional, professionaltip) && this.checkworks(works) && this.checkfavorites(favorites, favoritestip) && this.checkIDCard() && util.showCompErr(telephone, telRegex, this, toptip4tel) && util.showCompErr(email, emailRegex, this, toptip4email)
  },
  formsubmit: function (e) {

    if (!this.checkform()) {
      return
    }

    // 发送表单数据到服务器
    var that = this
    var recruitinfoid = this.data.recruitinfoid
    var datas = {
      name: this.data.name,
      gender: this.data.sexindex,
      origin: this.data.origin,
      marry: this.data.marry[this.data.marryindex],
      cardid: this.data.cardid,
      telephone: this.data.telephone,
      bestrecord: this.data.education[this.data.educationindex],
      language: this.data.language[this.data.languageindex],
      shool: this.data.school,
      professional: this.data.professional,
      favorites: this.data.favorites,
      works: this.data.works,
      recruitinfoid: recruitinfoid,
      email: this.data.email
    }
    wx.request({
      url: uploadInfoUrl,
      data: datas,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        wx.redirectTo({
          url: '../culture/culture?isFirstTime=true&recruitinfoid='+recruitinfoid,
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
  checkchange: function (e) {
    const MAX = 3
    var value = e.currentTarget.id
    var tmpfavorites = this.data.favorites
    var checkednum = this.data.checkednum
    const CHECKEDNUM = this.data.checkednum
    for (var index = 0; index < tmpfavorites.length; index++) {
      if (tmpfavorites[index].value == value) {
        if (CHECKEDNUM == MAX && tmpfavorites[index].checked) {
          --checkednum
          tmpfavorites[index].checked = !tmpfavorites[index].checked
        }
        if (CHECKEDNUM < MAX) {
          tmpfavorites[index].checked ? --checkednum : ++checkednum
          tmpfavorites[index].checked = !tmpfavorites[index].checked
        }
      }
    }
    this.setData({
      favorites: tmpfavorites,
      checkednum: checkednum
    })
    util.uploadApplicant(this, uploadInfoUrl)
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    wx.getStorage({
      key: 'aolc_recruitinfoid',
      success: function (res) {
        // success
        var recruitinfoid = res.data
        that.setData({
          recruitinfoid: recruitinfoid
        })
        if (recruitinfoid) {
          wx.request({
            url: getInfoUrl,
            data: {
              recruitinfoid: recruitinfoid
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            success: function (res) {
              // success
              var favorites = res.data.datas.data.favorites
              var works = res.data.datas.data.works
              var gender = res.data.datas.data.gender
              var sexindex = gender === null ? 0 : gender
              var school = res.data.datas.data.school
              var origin = res.data.datas.data.origin
              var idcard = res.data.datas.data.idcard
              var name = res.data.datas.data.name
              var marry = res.data.datas.data.marry
              var bestrecord = res.data.datas.data.bestrecord
              var telephone = res.data.datas.data.telephone
              var email = res.data.datas.data.email
              var professional = res.data.datas.data.professional
              var language = res.data.datas.data.language

              var theWorks = new Array()
              var chineseArr = ['一', '二', '三', '四', '五']
              var thisWorks = that.data.works
              if (works.toString() != [].toString()) {
                for (var i = 0; i < works.length; i++) {
                  var company = works[i].company != null ? works[i].company : ''
                  var job = works[i].job != null ? works[i].job : ''
                  var enddate = works[i].endDate != null ? works[i].endDate : ''
                  var startdate = works[i].startDate != null ? works[i].startDate : ''
                  var theWork = [chineseArr[i], company, job, startdate, enddate]
                  theWorks[i] = theWork
                }
              } else {
                theWorks = thisWorks
              }

              var languageindex = 0
              var languagetmp = that.data.language
              for (var i = 0; i < languagetmp.length; i++) {
                languageindex = languagetmp[i] === language ? i : languageindex
              }

              var marryindex = 0
              var marrytmp = that.data.marry
              for (var i = 0; i < marrytmp.length; i++) {
                marryindex = marrytmp[i] === marry ? i : marryindex
              }

              var educationindex = 0
              var education = that.data.education
              for (var i = 0; i < education.length; i++) {
                educationindex = education[i] === bestrecord ? i : educationindex
              }

              var checkednum = 0
              for (var i = 0; i < favorites.length; i++) {
                checkednum = favorites[i].checked ? ++checkednum : checkednum
              }

              that.setData({
                works: theWorks,
                name: name,
                favorites: favorites,
                school: school,
                professional: professional,
                email: email,
                telephone: telephone,
                cardid: idcard,
                origin: origin,
                sexindex: sexindex,
                marryindex: marryindex,
                educationindex: educationindex,
                checkednum: checkednum,
                languageindex: languageindex
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
          util.showTopTips(that,'网络异常')
        }
      },
      fail: function () {
        // fail
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