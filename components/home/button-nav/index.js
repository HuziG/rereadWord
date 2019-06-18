// components/home/button-nav/index.js
Component({
  
  properties: {
    todayWordInfo: Object
  },

  data: {

  },

  // observers: {
  //   'todayWordInfo': function (value) {
  //     this.setData({
  //       todayWordInfo: value
  //     })
  //   }
  // },

  methods: {
    toStudy() {
      if (this.data.studyBtnLock) { return }
      wx.navigateTo({
        url: '/pages/study/study'
      })
    }
  }
})
