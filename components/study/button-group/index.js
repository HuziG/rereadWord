// components/study/button-group/index.js
Component({
  properties: {

  },

  data: {
    mood: 1
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
