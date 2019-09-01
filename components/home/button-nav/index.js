// components/home/button-nav/index.js
Component({
  
  properties: {
    todayWordInfo: Object
  },

  data: {

  },

  methods: {
    toStudy() {
      if (this.data.studyBtnLock) { return }
      wx.navigateTo({
        url: '/pages/study/study'
      })
    }
  }
})
