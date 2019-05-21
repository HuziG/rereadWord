// components/home/mode/index.js
Component({
  properties: {
    mode: String
  },

  data: {
   
  },

  methods: {
    modeTo() {
      wx.navigateTo({
        url: `/pages/mode/mode?frompage=${'homepage'}`,
      })
    }
  }
})
