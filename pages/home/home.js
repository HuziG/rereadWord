// pages/home/home.js

const Page = require('../../utils/ald-stat.js').Page;
const App = new getApp()

Page({

  data: {
    leftMenuShow: false
  },

  onLoad: function () {
    this.checkPageState()
  },

  checkPageState() {
    if (!App.globalData['page_router']) {
      wx.redirectTo({
        url: '/pages/index/index'
      })
    }
  },

  showLeftMenu() {
    this.setData({
      leftMenuShow: true
    })
  },

  hideLeftMenu() {
    this.setData({
      leftMenuShow: false
    })
  }
})