// components/study/explain/index.js
Component({
  properties: {
    wordInfo: Object,
    show: {
      type: Boolean,
      value: false
    }
  },

  data: {

  },

  observers: {
    'wordInfo': function (wordInfo) {
      this.renderWordInfo(wordInfo)
    }
  },

  methods: {
    playVoice() {

    },

    renderWordInfo(wordInfo) {
      
    }
  }
})
