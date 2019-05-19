// components/study/button-group/index.js

Component({
  properties: {
    wordIndex: Number
  },

  data: {
    mood: 1
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

  methods: {
    unKnowHandle() {
      this.btnShowHandle()
    },

    knowHandle() {

    },

    nextHandle() {
      this.btnShowHandle()
    },

    preHandle() {
      this.btnShowHandle()
    },

    btnShowHandle() {
      this.setData({
        mood: this.data.mood === 1 ? 2 : 1
      }) 
    }
  }
})

/**
 * 认识、下一个<button>：通知父页面 indexWord += 1
 * 不认识<button>：通知父页面，显示explain
 */
