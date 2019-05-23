const App = getApp()

class UserModel {
  login() {
    return new Promise((resolve, reject) => {
      wx.login({
        success(res) {
          resolve(res.code)
        }
      })
    })
  }

  getOpenid(code) {
    return new Promise((resolve, reject) => {
      return wx.BaaS.invokeFunction('otherfun_getOpenid', { code }).then(res => {
        if (res.code === 0) {
          wx.setStorageSync('openid', res.data.data.openid)
          resolve(res.data.data)
        } else {
          reject(true)
        }
      })
    })
  }

  checkUser(data) {
    return new Promise((resolve, reject) => {
      let query = new wx.BaaS.Query()

      query.compare('openid', '=', data.openid)

      let Product = new wx.BaaS.TableObject('user_info')
      Product.setQuery(query).find().then(res => {
        if (res.statusCode === 200) {
          resolve(res.data.objects)
        } else {
          reject(true)
        }
      }, err => {
        reject(true)
      })
    })
  }

  checkUserHandle() {
    return new Promise((resolve, reject) => {
      this.login().then(this.getOpenid).then(this.checkUser).then(res => {
        resolve(res.length != 0)
      })
    })
  }

  initUserInfo(tel) {
    let openid = wx.getStorageSync('openid')

    let Product = new wx.BaaS.TableObject('user_info')
    let product = Product.create()

    let apple = {
      openid,
      tel
    }

    return new Promise((resolve, reject) => {
      product.set(apple).save().then(res => {
        if (res.statusCode === 201) {
          resolve(true)
        } else {
          reject(true)
        }
      }, err => {
        reject(true)
      })
    })
  } 

  initUserWord() {
    let openid = wx.getStorageSync('openid')

    let Product = new wx.BaaS.TableObject('user_wordinfo')
    let product = Product.create()

    let apple = {
      openid,
      mode: null,
      remWordNum: 0
    }

    return new Promise((resolve, reject) => {
      product.set(apple).save().then(res => {
        if (res.statusCode === 201) {
          App.globalData['user_wordinfo'] = res.data
          resolve(true)
        } else {
          reject(true)
        }
      }, err => {
        reject(true)
      })
    })
  } 

  initUserClockIn() {
    let openid = wx.getStorageSync('openid')

    let Product = new wx.BaaS.TableObject('user_clockIn')
    let product = Product.create()

    let apple = {
      openid,
      lastDate: '',
      daysNum: 0
    }

    return new Promise((resolve, reject) => {
      product.set(apple).save().then(res => {
        if (res.statusCode === 201) {
          resolve(true)
        } else {
          reject(true)
        }
      }, err => {
        reject(true)
      })
    })
  }

  registerUser(tel) {
    return new Promise((resolve, reject) => {
      this.initUserInfo(tel)
        .then(this.initUserWord)
        .then(this.initUserClockIn)
        .then(res => {
          resolve(true)
        })
    })
  }
}

export {
  UserModel
}