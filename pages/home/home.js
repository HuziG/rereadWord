// pages/home/home.js
const App = new getApp()

Page({

  data: {
    showPoster: false
  },

  onLoad: function (options) {
    
  },

  onShow() {
    this.init()
  },

  init() {
    let user_wordinfo = App.globalData['user_wordinfo']
    this.setData({
      mode: user_wordinfo.mode,
      remWordNum: user_wordinfo.remWordNum
    })
  },

  toStudy() {
    wx.navigateTo({
      url: '/pages/study/study'
    })
  }
})