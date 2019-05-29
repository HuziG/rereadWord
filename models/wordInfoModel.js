const App = getApp()

class WordInfoModel {
  getWordTableInfo() {
    let openid = wx.getStorageSync('openid')

    let query = new wx.BaaS.Query()
    query.compare('openid', '=', openid)
    let Product = new wx.BaaS.TableObject('user_wordinfo')

    return new Promise((resolve, reject) => {
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
  
  setWordMode(mode) {
    App.globalData['user_wordinfo'].mode = mode
    App.globalData['user_wordinfo'].remWordNum = 0

    let tableName = 'user_wordinfo'
    let recordID = App.globalData['user_wordinfo'].id

    let Product = new wx.BaaS.TableObject(tableName)
    let product = Product.getWithoutData(recordID)

    product.set('mode', mode)
    product.set('startGroup', 0)
    product.set('remWordNum', 0)
    return new Promise((resolve, reject) => {
      product.update().then(res => {
        resolve(true)
      }, err => {
        reject(true)
      })
    })
  }

  addWordNum(num) {
    App.globalData['user_wordinfo'].remWordNum += num

    let tableName = 'user_wordinfo'
    let recordID = App.globalData['user_wordinfo'].id 

    let Product = new wx.BaaS.TableObject(tableName)
    let product = Product.getWithoutData(recordID)

    product.incrementBy('remWordNum', num)
    
    return new Promise((resolve, reject) => {
      product.update().then(res => {
        // success
        resolve(true)
      }, err => {
        // err
        reject(true)
      })
    })
  }

  initWordInfo() {
    let tableName = 'user_wordinfo'
    let recordID = App.globalData['user_wordinfo'].id

    let Product = new wx.BaaS.TableObject(tableName)
    let product = Product.getWithoutData(recordID)

    product.set('mode', null)
    product.set('remWordNum', 0)
    return new Promise((resolve, reject) => {
      product.update().then(res => {
        console.log(res.data)
        App.globalData['user_wordinfo'] = res.data
        resolve(true)
      }, err => {
        reject(true)
      })
    })
  }
}

export {
  WordInfoModel
}