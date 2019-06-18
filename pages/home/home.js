// pages/home/home.js

const Page = require('../../utils/ald-stat.js').Page;
const App = new getApp()

Page({

  data: {
    leftMenuShow: false
  },

  onLoad: function (options) {

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