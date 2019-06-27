// pages/user/user.js
const Page = require('../../utils/ald-stat.js').Page;
const App = getApp();

Page({

  data: {
    skinStyle: App.globalData.skinStyle
  },

  onLoad: function (options) {
    this.setSkipStyle()
  },

  setSkipStyle() {
    this.setData({
      skinStyle: App.globalData.skinStyle
    })
  }
})