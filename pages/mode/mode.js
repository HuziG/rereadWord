// pages/mode/mode.js
import { WordInfoModel } from '../../models/wordInfoModel.js'

const wordInfoModel = new WordInfoModel()

Page({

  data: {

  },

  onLoad: function (options) {
    this.checkBackBtn(options)
  },

  setMode(e) { // 设置mode
    wordInfoModel.setWordMode(e.detail.mode).then(res => {
      wx.switchTab({
        url: '/pages/home/home'
      })
    })
  },

  checkBackBtn(options) {
    if (options.frompage === 'homepage') {
      this.setData({
        navMode: 1
      })
    } else if (options.frompage === undefined) {
      this.setData({
        navMode: 0
      })
    }
  }
})