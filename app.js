//app.js
const App = require('./utils/ald-stat.js').App;

var bugOut = require('./utils/bugOut.min.js')
bugOut.usePlugins = true   
bugOut.init(true, '776eb3cf0191f856505673ba8f1e4f38', '1.0.0')

App({
  onLaunch: function() {
    wx.onNetworkStatusChange(function (res) {
      let timeInterval = ''
      if (res.isConnected === false) {
        wx.showToast({
          title: '网络崩溃~',
          icon: 'none',
          duration: 2000
        })
        timeInterval = setInterval(() => {
          wx.showToast({
            title: '网络崩溃~',
            icon: 'none',
            duration: 2000
          })
        }, 8000);
      } else {
        clearInterval(timeInterval)
      }
    })

    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login,
     wx.getUserInfo,
     wx.requestPayment)

    wx.BaaS.init('2f607317e51c661c8f57')
  },

  onError: function (res) {
    bugOut.track(res)
  },

  globalData: {}
})