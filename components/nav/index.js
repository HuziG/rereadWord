const App = getApp();
// components/nav/index.js
Component({
  options: {
    multipleSlots: true
  },
  externalClasses: ["out-class"],
  properties: {
    mode: Number,
    title: String
  },

  data: {
    _barHeight: wx.getSystemInfoSync().statusBarHeight,
    get barHeight() {
      return this._barHeight;
    },
    set barHeight(value) {
      this._barHeight = value;
    },
    skinStyle: App.globalData.skinStyle
  },

  attached() {
    this.setData({
      firstSkip: wx.getStorageSync('first_skip')
    })
    this.setSkipStyle()
  },

  methods: {
    backTo() {
      wx.navigateBack({
        delta: 1
      });
    },

    showLeftMenu() {
      this.triggerEvent("showLeftMenu", {}, {});
    },

    setSkipStyle() {
      this.setData({
        skinStyle: App.globalData.skinStyle
      })
    },

    exitTo() {
      wx.redirectTo({
        url: '/pages/home/home'
      })
    }
  }
});
