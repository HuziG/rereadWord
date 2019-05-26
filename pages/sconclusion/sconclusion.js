// pages/sconclusion/sconclusion.js
import { WordInfoModel } from '../../models/wordInfoModel'

const App = new getApp()
const wordInfoModel = new WordInfoModel()

Page({

  data: {
    showPoster: false
  },

  onLoad: function () {
    let conslusionWord = App.globalData.conslusionWord
    this.setData({
      wordArr: conslusionWord
    })
    wordInfoModel.addWordNum(conslusionWord.length).then(res => {
    })
  }
})