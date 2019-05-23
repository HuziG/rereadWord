// pages/study/study.js
import { cet4 } from '../../static/data/cet4.js';
import { cet4_import } from '../../static/data/cet4_import.js';
import { cet6 } from '../../static/data/cet6.js';
import { cet6_import } from '../../static/data/cet6_import.js';
import { kaoyan_import } from '../../static/data/kaoyan_import.js'
import { kaoyan } from '../../static/data/kaoyan.js'

import { StudyModel } from '../../models/studyModel.js'

const App = new getApp();
const studyModel = new StudyModel()

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
    wordArr: []
  },

  onLoad: function (options) {
    this.filterWord()
  },

  filterWord() {
    let user_wordinfo = App.globalData['user_wordinfo']
    let lib = this.data.wordLibrary.find(item => {
      return item.name === user_wordinfo.mode
    })
    this.data.wordArr = lib.key.slice(user_wordinfo.remWordNum, user_wordinfo.remWordNum+20)

    this.setData({ loading: true })
    studyModel.forOrgWordInfo(this.data.wordArr).then(res => {
      this.setData({ loading: false })
      this.setData({
        wordArr: res
      })
      this.renderWord(0)
    })
  },

  unKnowHandle() {
    this.setData({
      explainShow: true
    })
  },

  knowHandle() {
    this.setData({
      wordIndex: ++this.data.wordIndex,
      explainShow: false
    })
    this.renderWord(this.data.wordIndex)
  },

  nextHandle() {
    this.setData({
      wordIndex: ++this.data.wordIndex,
      explainShow: false
    })
    this.renderWord(this.data.wordIndex)
  },

  preHandle() {
    this.setData({
      wordIndex: --this.data.wordIndex,
      explainShow: false
    })
    this.renderWord(this.data.wordIndex)
  },

  renderWord(index) {
    this.setData({
      wordCon: this.data.wordArr[index],
      wordIndex: index,
      explainShow: false
    })
  }
})