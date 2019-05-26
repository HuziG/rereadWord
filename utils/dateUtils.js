function changeDate(date, days) {
  var d = new Date(date);
  d.setDate(d.getDate() + days);
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var val = d.getFullYear() + "-" + parseInt(month) + "-" + parseInt(day);
  return val;
}

function getNowTime() {
  var now = new Date();
  var time = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
  return time
}

module.exports = {
  changeDate: changeDate,
  getNowTime: getNowTime
}