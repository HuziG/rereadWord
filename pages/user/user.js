// pages/user/user.js
const Page = require('../../utils/ald-stat.js').Page;

Page({

  data: {
    aboutUsPop: false
  },

  onLoad: function (options) {

  },

  showAboutUs() {
    this.setData({
      aboutUsPop: !this.data.aboutUsPop
    })
  }
})