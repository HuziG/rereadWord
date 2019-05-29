// pages/home/home.js
const App = new getApp()

Page({

  data: {
    showPoster: false,
    studyBtnLock: true
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

  unLock() {
    this.setData({
      studyBtnLock: false
    })
  },

  toStudy() {
    if (this.data.studyBtnLock) { return } 
    wx.navigateTo({
      url: '/pages/study/study'
    })
  }
})