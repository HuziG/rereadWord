// components/nav/index.js
Component({
  externalClasses: ['line-class'],
  properties: {
    mode: Number,
    title: String
  },

  
  data: {
    barHeight: wx.getSystemInfoSync().statusBarHeight
  },
  
  methods: {
    backTo() {
      wx.navigateBack({
        delta: 1
      })
    }
  }
})
