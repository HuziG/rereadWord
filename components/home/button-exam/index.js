// components/home/button-exam/index.js
import { getNowTime } from '../../../utils/dateUtils.js'

Component({
  
  properties: {
    
  },

  
  data: {

  },

  attached() {
    let temData = wx.getStorageSync('today_word')
    
    if (temData === '') {
      resert()
    } 
    if (temData.date != getNowTime()) {
      resert()
    }

    wx.setStorageSync('today_word', temData)

    function resert() {
      temData = { date: getNowTime(), data: [] }
    }
  },

  ready() {
    let temData = wx.getStorageSync('today_word')
    this.setData({
      studyExamLock: temData.data.length === 0 ? true : false
    })
  },
  
  methods: {
    toExam() {
      if (this.data.reStudyBtnLock) { return }
      wx.navigateTo({
        url: '/pages/study-exam/study-exam'
      })
    }
  }
})
