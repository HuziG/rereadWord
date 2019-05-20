// pages/home/home.js
Page({

  data: {
    showPoster: false
  },

  onLoad: function (options) {
    
  },

  toStudy() {
    wx.navigateTo({
      url: '/pages/study/study'
    })
  }
})