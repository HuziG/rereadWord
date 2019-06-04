// pages/study/study.js
import { cet4 } from '../../static/data/cet4.js';
import { cet4_import } from '../../static/data/cet4_import.js';
import { cet6 } from '../../static/data/cet6.js';
import { cet6_import } from '../../static/data/cet6_import.js';
import { kaoyan_import } from '../../static/data/kaoyan_import.js'
import { kaoyan } from '../../static/data/kaoyan.js'

import { StudyModel } from '../../models/studyModel.js'

const Page = require('../../utils/ald-stat.js').Page;
const App = new getApp();
const studyModel = new StudyModel()
const ia = wx.createInnerAudioContext()

Page({

  data: {
    wordLibrary: [
      { name: 'cet4', key: cet4 },
      { name: 'cet4_import', key: cet4_import },
      { name: 'cet6', key: cet6 },
      { name: 'cet6_import', key: cet6_import },
      { name: 'kaoyan_import', key: kaoyan_import },
      { name: 'kaoyan', key: kaoyan }
    ],
    wordArr: [],
    loading: true,
    znPopup: false
  },

  onLoad: function (options) {
    this.filterWord()
  },

  unKnowHandle() {
    this.setData({
      explainShow: true
    })
  },

  knowHandle() {
    if (!this.finishCheck()) { return }
    this.setData({
      wordIndex: this.data.wordIndex + 1,
      explainShow: false
    })
    this.renderWord(this.data.wordIndex)
  },

  nextHandle() {
    if (!this.finishCheck()) { return }
    this.setData({
      wordIndex: this.data.wordIndex + 1,
      explainShow: false
    })
    this.renderWord(this.data.wordIndex)
  },

  preHandle() {
    this.stopPlayVoice()
    this.setData({
      wordIndex: --this.data.wordIndex,
      explainShow: false
    })
    this.renderWord(this.data.wordIndex)
  },

  finishCheck() {
    if (this.data.wordIndex + 1 === this.data.wordArr.length) {
      this.mapWordZn()
      return false
    } else {
      return true
    }
  },

  mapWordZn() {
    let arr = this.data.wordArr.map(item => {
      return { word: item.wordExplatin.content, zn: item.wordExplatin.definition}
    })
    App.globalData.conslusionWord = arr
    wx.redirectTo({
      url: `/pages/sconclusion/sconclusion`
    })
  },

  filterWord() {
    let user_wordinfo = App.globalData['user_wordinfo']
    let lib = this.data.wordLibrary.find(item => {
      return item.name === user_wordinfo.mode
    })
    this.data.wordArr = lib.key.slice(user_wordinfo.remWordNum, user_wordinfo.remWordNum + 10)

    studyModel.forOrgWordInfo(this.data.wordArr).then(res => {
      this.setData({
        loading: false,
        wordArr: res
      })
      this.renderWord(0)
    })
  },

  renderWord(index) {
    this.setData({
      wordCon: this.data.wordArr[index],
      wordIndex: index,
      explainShow: false
    })
  },

  initPlayVoice(e) { // 渲染播放音频
    ia.src = e.detail.mp3_url
    ia.loop = false
    ia.play()
  },

  loopPlayVoice(e) {
    this.setData({
      znPopup: true
    })
    ia.src = e.detail.mp3_url
    ia.loop = true
    ia.play()
  },

  stopPlayVoice() {
    ia.stop()
  },

  onUnload() {
    this.stopPlayVoice()
  }
})