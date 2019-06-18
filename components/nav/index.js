// components/nav/index.js
Component({
  options: {
    multipleSlots: true 
  },
  externalClasses: ['out-class'],
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
  },
  
  methods: {
    backTo() {
      wx.navigateBack({
        delta: 1
      })
    },

    showLeftMenu() { 
      this.triggerEvent('showLeftMenu', {}, {})
    }
  }
})
