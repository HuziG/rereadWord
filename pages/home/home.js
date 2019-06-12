// pages/home/home.js
import { ClockInModel } from '../../models/clockInModel.js'

const Page = require('../../utils/ald-stat.js').Page;
const clockInModel = new ClockInModel()
const App = new getApp()

Page({

  data: {
    showPoster: false,
    studyBtnLock: true
  },

  onLoad: function (options) {

  },

  onShow() {
    // 增加了 timeout
    setTimeout(() => {
      this.init()
    }, 150);
  },

  init() {
    let user_wordinfo = App.globalData['user_wordinfo']
    clockInModel.getClockInfo().then(res => {
      this.setData({
        mode: user_wordinfo.mode,
        remWordNum: user_wordinfo.remWordNum,
        daysNum: res.daysNum || 0
      })
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