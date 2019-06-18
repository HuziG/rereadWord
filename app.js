//app.js
const App = require('./utils/ald-stat.js').App;

var bugOut = require('./utils/bugOut.min.js')
bugOut.usePlugins = true   
bugOut.init(true, '776eb3cf0191f856505673ba8f1e4f38', '2.0.0')

App({
  onLaunch: function(options) {
    console.log(options.scene)
    if (options.scene === 1129) {
      this.sitemapHandle()
    }

    wx.BaaS = requirePlugin('sdkPlugin')

    wx.BaaS.wxExtend(wx.login,
     wx.getUserInfo,
     wx.requestPayment)

    wx.BaaS.init('2f607317e51c661c8f57')

    this.checkInternet()
    this.checkUpdate()
  },

  onError: function (res) {
    bugOut.track(res)
  },

  checkUpdate() {
    const updateManager = wx.getUpdateManager()

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false,
        success: function (res) {
          
        },
      })
    })
  },

  checkInternet() {
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
  },

  sitemapHandle() { // 1129场景值处理
    wx.showModal({
      title: '请先进行注册~',
      showCancel: false,
      success(res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '/pages/index/index'
          })
        }
      }
    })
  },

  globalData: {}
})