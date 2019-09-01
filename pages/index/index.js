//index.js
import { UserModel } from '../../models/userModel.js'
import { WordInfoModel } from '../../models/wordInfoModel.js'

const Page = require('../../utils/ald-stat.js').Page;
const App = getApp()

const userModel = new UserModel()
const wordInfoModel = new WordInfoModel()

var timeout

Page({
  data: {
    loading: true
  },
  
  onLoad() {
    this.checkUserExist()
    this.loadTooLong()
    
    App.globalData['page_router'] = 'index'
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
        wx.redirectTo({
          url: '/pages/mode/mode'
        })
      } else {
        wx.redirectTo({
          url: '/pages/home/home'
        })
      }
    })
  },

  getPhoneNumber(e) { // 授权，获取用户手机号
    this.setData({ loading: true })

    userModel.registerUser(e.detail.value).then(res => { // 用户注册
      this.setData({ loading: false })

      wx.redirectTo({
        url: '/pages/mode/mode'
      })
    })
  },

  loadTooLong() {
    timeout = setTimeout(() => {
      wx.showModal({
        content: '启动时间过长,是否需要重启？',
        showCancel: true,
        cancelText: '取消',
        confirmText: '确定',
        success: (result) => {
          if(result.confirm){
            wx.reLaunch({
              url: '/pages/index/index'
            })
          }
        }
      })
    }, 10000);
  },

  onUnload() {
    clearTimeout(timeout)
  }

})