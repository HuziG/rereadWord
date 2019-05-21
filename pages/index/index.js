//index.js
import { UserModel } from '../../models/userModel.js'
import { WordInfoModel } from '../../models/wordInfoModel.js'

const App = getApp()

const userModel = new UserModel()
const wordInfoModel = new WordInfoModel()

Page({
  data: {
    loading: true
  },
  
  onLoad() {
    this.checkUserExist()
  },

  checkUserExist() {
    userModel.checkUserHandle().then(res => { // 用户存在检测
      this.setData({ loading: res })

      if (res) {
        this.setWordInfoTable()
      }
    })
  },

  setWordInfoTable() {
    wordInfoModel.getWordTableInfo().then(res => {
      App.globalData['user_wordinfo'] = res[0]
      if (res[0].mode === null) {
        wx.navigateTo({
          url: '/pages/mode/mode'
        })
      } else {
        wx.switchTab({
          url: '/pages/home/home'
        })
      }
    })
  },

  getPhoneNumber(e) {
    this.setData({ loading: true })

    userModel.registerUser(e.detail.value).then(res => { // 用户注册
      this.setData({ loading: false })

      wx.navigateTo({
        url: '/pages/mode/mode'
      })
    })
  }

})