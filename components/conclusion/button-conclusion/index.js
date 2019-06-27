// components/study/button-conclusion/index.js
const App = getApp();

Component({
  externalClasses: ['dark-color'],
  properties: {},

  data: {
    second: 5,
    disalbed: true,
    nextShow: false,
    loading: false,
    skinStyle: App.globalData.skinStyle
  },

  attached() {
    this.offDisabled();
  },

  methods: {
    offDisabled() {
      let interval = setInterval(() => {
        if (this.data.second === 0) {
          clearInterval(interval);
          this.setData({
            disalbed: false,
            nextShow: true
          });
          return;
        }

        this.setData({
          second: (this.data.second -= 1)
        });
      }, 1000);
    },

    nextPage() {
      if (this.data.disalbed) {
        return;
      }
      wx.redirectTo({
        url: "/pages/home/home"
      });
    }
  }
});
