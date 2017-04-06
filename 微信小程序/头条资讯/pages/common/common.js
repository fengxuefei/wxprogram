var minute = 1000*60;
var hour = minute*60;
var day = hour*24;
var halfmonth = day*15;
var month = 2 * halfmonth;

function getDateDiff(dateTimeStamp){
    var now = new Date().getTime();
    var delta = now - dateTimeStamp;
    var monthC = delta/month;
    var weekC = delta/(7*day);
    var dayC = delta/day;
    var hourC = delta/hour;
    var minteC = delta/minute;

    var result;
    if(monthC >= 1){
        result = parseInt(monthC)+'个月前';
    }else if(weekC >= 1){
        result = parseInt(weekC)+'周前';
    }else if(dayC >= 1){
        result = parseInt(dayC)+'天前';
    }else if(hourC >= 1){
        result = parseInt(hourC)+'小时前';
    }else if(minteC >= 1){
        result = parseInt(minteC)+'分钟前';
    }else{
        result = '刚刚发布';
    }
    return result;
}

module.exports.getDateDiff = getDateDiff;