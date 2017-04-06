function checkdate(startdate, enddate) {
    var arr = startdate.split("-");
    var starttime = new Date(arr[0], arr[1], arr[2]);
    var starttimes = starttime.getTime();

    var arrs = enddate.split("-");
    var lktime = new Date(arrs[0], arrs[1], arrs[2]);
    var lktimes = lktime.getTime();

    if (starttimes > lktimes) {
        return false;
    }
    else
        return true;
}

function checkdateValid(date) {
    var now = new Date().getTime()

    var arr = date.split("-");
    var time = new Date(parseInt(arr[0]), parseInt(arr[1]) - 1, parseInt(arr[2]));
    var times = time.getTime();
    if (times > now) {
        return false
    }
    return true
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}

function matchExp(des, regex) {
    if (des) {
        return des.match(regex) == null ? false : true
    }
    return false
}

function showCompErr(des, regex, context, toptipinform) {
    if (!matchExp(des, regex)) {
        context.setData({
            showTopTips: true,
            toptipinform: toptipinform
        })
        setTimeout(function () {
            context.setData({
                showTopTips: false
            });
        }, 3000)
        return false
    }
    return true
}

function uploadApplicant(context, uploadUrl) {
    var datas = {
        name: context.data.name,
        gender: context.data.sexindex,
        origin: context.data.origin,
        marry: context.data.marry[context.data.marryindex],
        cardid: context.data.cardid,
        telephone: context.data.telephone,
        bestrecord: context.data.education[context.data.educationindex],
        language: context.data.language[context.data.languageindex],
        shool: context.data.school,
        professional: context.data.professional,
        favorites: context.data.favorites,
        works: context.data.works,
        recruitinfoid: context.data.recruitinfoid,
        email: context.data.email
    }

    wx.request({
        url: uploadUrl,
        data: datas,
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {

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
}

function showTopTips(context, toptipinform) {
    context.setData({
        showTopTips: true,
        toptipinform: toptipinform
    })
    setTimeout(function () {
        context.setData({
            showTopTips: false
        });
    }, 3000)
}

module.exports.checkdate = checkdate
exports.getNowFormatDate = getNowFormatDate
exports.showCompErr = showCompErr
exports.uploadApplicant = uploadApplicant
exports.matchExp = matchExp
exports.checkdateValid = checkdateValid
