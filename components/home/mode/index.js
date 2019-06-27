// components/home/mode/index.js
const App = getApp();

Component({
  externalClasses: ['dark-text-color', 'dark-text-vice-color'],
  properties: {
    mode: String
  },

  data: {
  },

  ready() {
    setTimeout(() => {
      this.initData();
    }, 150);
  },

  methods: {
    initData() {
      let user_wordinfo = App.globalData["user_wordinfo"];
      this.setData({
        mode: user_wordinfo.mode
      });
    },

    modeTo() {
      wx.navigateTo({
        url: `/pages/mode/mode?frompage=${"homepage"}`
      });
    }
  }
});
