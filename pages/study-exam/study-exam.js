// pages/study-exam/study-exam.js
import { StudyModel } from "../../models/studyModel.js";

const studyModel = new StudyModel()
const App =  getApp();
const ia = wx.createInnerAudioContext()
ia.obeyMuteSwitch = false

var correctVoiceUrl

Page({

  data: {
    winHeight: wx.getSystemInfoSync().windowHeight,
    wordIndex: 0,
    loading: true,
    skinStyle: App.globalData.skinStyle,
    wordPopup: '*'
  },

  onLoad: function (options) {
    this.setProgressTop()
    this.setSkipStyle()

    this.handleMode(options)
  },

  onUnload() {
    ia.stop()
  },

  handleMode(options) { // 不同模式处理
    let navMode = options.frompage === undefined ? 2 : 4
    if (options.frompage === undefined) {
      this.initData(wx.getStorageSync('today_word').data)
    } else {
      this.initData(App.globalData.temExamData)
    }
    this.setData({
      navMode
    })
  },

  initData(data) { // 初始化渲染信息
    studyModel.getWordSentenceArr(data).then(res => {
      this.setData({
        loading: false,
        examData: res
      })
      this.renderQuestion(this.data.wordIndex)
    })
    
    this.setData({
      sourceData: data
    })

    studyModel.getCorrectVoice().then(res => {
      correctVoiceUrl = res
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
    this.showCurWord()
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

  showCurWord() {
    let data = this.data.sourceData[this.data.wordIndex]
    setTimeout(() => {
      this.setData({
        curWordInfo: `${data.word}${data.zn}`,
        wordPopup: ''
      })
    }, 700);
  },

  preHandle() { // 上一个
    let temIndex = --this.data.wordIndex
    ia.stop()
    this.setData({
      wordIndex: temIndex,
      ansRight: false,
      wordPopup: '*'
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
      ansRight: false,
      wordPopup: '*'
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
    ia.src = correctVoiceUrl
    ia.play()
  },

  setProgressTop() { // 设置progress 的顶部位置
    setTimeout(() => {
      let selQuery = wx.createSelectorQuery().in(this)
      selQuery.select('#navCmp').boundingClientRect((rect) => {
        this.setData({
          progressTop: rect.height
        })
      }).exec()
    }, 200);
  },

  setSkipStyle() {
    this.setData({
      skinStyle: App.globalData.skinStyle
    })
  }
})