// components/home/left-menu/index.js
const App = getApp()

Component({
  externalClasses: ['dark-color'],
  properties: {
    skinStyle: String
  },

  data: {
    barHeight: wx.getSystemInfoSync().statusBarHeight
  },

  attached() {
    this.setData({
      firstSkip: wx.getStorageSync('first_skip')
    })
  },

  methods: {
    userPageTo() {
      wx.navigateTo({
        url: "/pages/user/user"
      });
    },

    handleSkinStyle() {
      const skinStyle = this.data.skinStyle === 'dark' ? 'light' : 'dark'
      App.globalData.skinStyle = skinStyle
      wx.setStorageSync('first_skip', false);
      wx.reLaunch({
        url: '/pages/home/home'
      })
    }
  }
});
