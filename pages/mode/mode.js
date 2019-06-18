// pages/mode/mode.js
import { WordInfoModel } from '../../models/wordInfoModel.js'

const Page = require('../../utils/ald-stat.js').Page;
const wordInfoModel = new WordInfoModel()

Page({

  data: {

  },

  onLoad: function (options) {
    this.checkBackBtn(options)
  },

  setMode(e) { // 设置mode
    wordInfoModel.setWordMode(e.detail.mode).then(res => {
      wx.redirectTo({
        url: '/pages/home/home'
      })
    })
  },

  checkBackBtn(options) { // 检测是否需要显示nav的返回按钮
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