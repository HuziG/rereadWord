// pages/home/home.js

const Page = require("../../utils/ald-stat.js").Page;
const App = new getApp();

Page({
  data: {
    leftMenuShow: false,
    skinStyle: App.globalData.skinStyle
  },

  onLoad: function() {
    // this.checkPageState()
    this.setSkipStyle()
  },

  checkPageState() {
    if (!App.globalData["page_router"]) {
      wx.redirectTo({
        url: "/pages/index/index"
      });
    }
  },

  showLeftMenu() {
    this.setData({
      leftMenuShow: true
    });
  },

  hideLeftMenu() {
    this.setData({
      leftMenuShow: false
    });
  },

  setSkipStyle() {
    this.setData({
      skinStyle: App.globalData.skinStyle
    })
  }
});
