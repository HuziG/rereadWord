// components/nav/index.js
Component({
  
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
