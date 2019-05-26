import { changeDate, getNowTime} from '../utils/dateUtils.js'

const App = getApp()

class ClockInModel {
  getClockInfo() {
    let openid = wx.getStorageSync('openid')

    let query = new wx.BaaS.Query()
    query.compare('openid', '=', openid)
    let Product = new wx.BaaS.TableObject('user_clockIn')

    return new Promise((resolve, reject) => {
      Product.setQuery(query).find().then(res => {
        if (res.statusCode === 200) {
          App.globalData['user_clockIn'] = res.data.objects[0]
          resolve(res.data.objects[0])
        } else {
          reject(true)
        }
      }, err => {
        reject(true)
      })
    })
  }

  setClockInfo(lastDate, daysNum) {
    let tableName = 'user_clockIn'
    let recordID = App.globalData['user_clockIn'].id
    let Product = new wx.BaaS.TableObject(tableName)
    let product = Product.getWithoutData(recordID)

    product.set('lastDate', lastDate)
    product.set('daysNum', daysNum)
    
    return new Promise((resolve, reject) => {
      product.update().then(res => {
        resolve(true)
      }, err => {
        reject(true)
      })
    })
  }

  getDaysNum() {
    return new Promise((resolve, reject) => {
      this.getClockInfo().then(res => {
        let dayNum = App.globalData['user_clockIn'].daysNum
        let nowDay = getNowTime()
        if (res.lastDate === null) {
          dayNum = 1
        }
        if (res.lastDate != null && changeDate(res.lastDate, 1) === nowDay) {
          dayNum += 1
        } else if (res.lastDate != null && res.lastDate === nowDay) {
          dayNum += 0
        } else {
          dayNum = 1
        }

        this.setClockInfo(nowDay, dayNum).then(res => {
          resolve(dayNum)
        }).catch(err => {
          reject(err)
        })
      })
    })
  }
}

export {
  ClockInModel
}