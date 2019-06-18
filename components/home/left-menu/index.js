// components/home/left-menu/index.js
Component({
  
  properties: {

  },

  data: {
    barHeight: wx.getSystemInfoSync().statusBarHeight
  },

  methods: {
    userPageTo() {
      wx.navigateTo({
        url: '/pages/user/user'
      })
    }
  }
})
