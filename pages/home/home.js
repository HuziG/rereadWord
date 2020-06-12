/*
 * @Author: your name
 * @Date: 2020-06-12 22:44:49
 * @LastEditTime: 2020-06-12 23:27:57
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /rereadWord/pages/home/home.js
 */

// pages/home/home.js

const Page = require("../../utils/ald-stat.js").Page;
const App = new getApp();

Page({
  data: {
    leftMenuShow: false,
    skinStyle: App.globalData.skinStyle,
  },

  onLoad() {
    // this.checkPageState()
    this.setSkipStyle();
  },

  checkPageState() {
    if (!App.globalData["page_router"]) {
      wx.redirectTo({
        url: "/pages/index/index",
      });
    }
  },

  showLeftMenu() {
    this.setData({
      leftMenuShow: true,
    });
  },

  hideLeftMenu() {
    this.setData({
      leftMenuShow: false,
    });
  },

  setSkipStyle() {
    this.setData({
      skinStyle: App.globalData.skinStyle,
    });
  },
});
