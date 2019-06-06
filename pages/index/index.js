//index.js
import { UserModel } from '../../models/userModel.js'
import { WordInfoModel } from '../../models/wordInfoModel.js'

const Page = require('../../utils/ald-stat.js').Page;
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

  checkUserExist() { // 用户存在检测
    userModel.checkUserHandle().then(res => { 
      this.setData({ loading: res })

      if (res) {
        this.setWordInfoTable()
      }
    })
  },

  setWordInfoTable() { // 用户已注册，设置user_wordinfo的表列数据
    wordInfoModel.getWordTableInfo().then(res => {
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

  getPhoneNumber(e) { // 授权，获取用户手机号
    this.setData({ loading: true })

    userModel.registerUser(e.detail.value).then(res => { // 用户注册
      this.setData({ loading: false })

      wx.navigateTo({
        url: '/pages/mode/mode'
      })
    })
  }

})