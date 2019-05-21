// pages/home/home.js
const App = new getApp()

Page({

  data: {
    showPoster: false
  },

  onLoad: function (options) {
    this.init()
  },

  init() {
    let mode = App.globalData['user_wordinfo'].mode
    this.setData({
      mode
    })
  },

  toStudy() {
    wx.navigateTo({
      url: '/pages/study/study'
    })
  }
})