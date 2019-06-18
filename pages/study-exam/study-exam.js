// pages/study-exam/study-exam.js
import { StudyModel } from "../../models/studyModel.js";

const ia = wx.createInnerAudioContext()
const studyModel = new StudyModel()

Page({

  data: {
    winHeight: wx.getSystemInfoSync().windowHeight,
    wordIndex: 0,
    loading: true
  },

  onLoad: function () {
    this.initData()
    this.setProgressTop()
  },

  onUnload() {
    ia.stop()
  },

  initData() { // 初始化渲染信息
    studyModel.getWordSentenceArr(wx.getStorageSync('today_word').data).then(res => {
      this.setData({
        loading: false,
        examData: res
      })
      this.renderQuestion(this.data.wordIndex)
    })
  },

  renderQuestion(index) { // 渲染信息 参数：索引
    let annotation = this.data.examData[index].annotation
    this.setData({
      answer: this.data.examData[index].word,
      annotation,
      translation: this.data.examData[index].translation,
      wordIndex: index
    })

    this.setAnnotationHandle(annotation)
  },

  ansRightHandle() { // 正确答案操作
    this.playCorrectVoice()
    setTimeout(() => {
      this.setData({
        ansRight: true
      })
      let annotationUrl = this.data.annotationUrl
      if (annotationUrl != undefined && annotationUrl != null) {
        ia.src = annotationUrl
        ia.play()
      } 
    }, 800)
  },

  preHandle() { // 上一个
    let temIndex = --this.data.wordIndex
    ia.stop()
    this.setData({
      wordIndex: temIndex,
      ansRight: false
    })
    this.renderQuestion(this.data.wordIndex)
  },

  nextHandle() { // 下一个
    let temIndex = ++this.data.wordIndex
    if (temIndex === this.data.examData.length) {
      wx.redirectTo({
        url: '/pages/home/home'
      })
      return
    }

    ia.stop()
    this.setData({
      wordIndex: temIndex,
      ansRight: false
    })
    this.renderQuestion(this.data.wordIndex)
  },

  setAnnotationHandle(annotation) { // 例句语音操作
    annotation = annotationHand(annotation)
    studyModel.getSentenceVoice(annotation).then(res => {
      this.setData({
        annotationUrl: res
      })
    })

    function annotationHand(value) { // 例句信息 再处理， 将vocab标签剔除
      let _value = value.replace("<vocab>", "")
      _value = _value.replace("</vocab>", "")
      return _value
    }
  },

  playAnnotationVoice() {
    ia.play()
  },

  playCorrectVoice() { // 回答正确播放的音效
    ia.src = 'http://fjdx.sc.chinaz.net/Files/DownLoad/sound1/201801/9677.mp3'
    ia.play()
  },

  setProgressTop() { // 设置progress 的顶部位置
    let selQuery = wx.createSelectorQuery().in(this)
    selQuery.select('#navCmp').boundingClientRect((rect) => {
      this.setData({
        progressTop: rect.height
      })
    }).exec()
  }
})