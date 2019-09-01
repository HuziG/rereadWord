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

    this.nightCheck()
  },

  methods: {
    nightCheck() {
      let hours = new Date().getHours()
      if (hours >= 23 && !App.globalData.nightCheck) {
       wx.showModal({
         title: '已入深夜',
         content: '是否需要开启夜间模式?',
         showCancel: true,
         cancelText: '不需要',
         confirmText: '好的',
         success: (result) => {
           if(result.confirm){
             this.handleSkinStyle()
           }
         },
         complete() {
           App.globalData.nightCheck = true
         }
       });
      }
    },

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
