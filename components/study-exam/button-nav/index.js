// components/study-exam/button-nav/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    wordIndex: Number
  },

  observers: {
    'wordIndex': function (value) {
      if (value === 0) {
        this.setData({
          preBtnShow: false
        })
      } else {
        this.setData({
          preBtnShow: true
        })
      }
    }
  },

  data: {

  },

  methods: {
    nextHandle() {
      wx.vibrateShort()
      this.triggerEvent('nextHandle', {}, {})
    },

    playAnnotationVoice() {
      this.triggerEvent('playAnnotationVoice', {}, {})
    },

    preHandle() {
      wx.vibrateShort()
      this.triggerEvent('preHandle', {}, {})
    }
  }
})
