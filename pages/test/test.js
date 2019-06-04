//index.js
import { hex_md5 } from '../../utils/md5.js'

import { cet4 } from '../../static/data/cet4.js';
import { cet4_import } from '../../static/data/cet4_import.js';
import { cet6 } from '../../static/data/cet6.js';
import { cet6_import } from '../../static/data/cet6_import.js';
import { kaoyan_import } from '../../static/data/kaoyan_import.js'
import { kaoyan } from '../../static/data/kaoyan.js'

import { ClockInModel } from '../../models/clockInModel.js'
const clockInModel = new ClockInModel()

// baidu Api
var tok = '24.a530492f7418910f32f63eff80a10340.2592000.1560246717.282335-16231541'
var cuid = 'CC-2F-71-2E-04-C3'

// youdao Api
const appKey = '6db82689a464b1be'
const appScrect = 'vNTZqKd7cNE6E3khXSdHsNE4MoBgWUr8'
var arrIndex = 0

var ia = wx.createInnerAudioContext()

Page({
  data: {
    wordErrorlLocal: wx.getStorageSync('error_wordDetail') || []
  },

  onLoad() {
    // this.getVoice('cat')

    // this.getExample(1521)

    // 累计打卡使用
    // clockInModel.getDaysNum().then(res => {
    //   console.log(res)
    // })

    // let arr = Array.from(new Set(cet4.concat(cet4_import).concat(cet6).concat(cet6_import).concat(kaoyan).concat(kaoyan_import)))

    // let arr = wx.getStorageSync('error_wordDetail')

    // let promiseArr = []
    // let i = 0

    // let timer = setInterval(() => {
    //   if (i === arr.length) {
    //     console.log('finish')
    //     clearInterval(timer);
    //     return
    //   }
    //   promiseArr.push(this.youdao(arr[i]))
    //   console.log(`${i}---${arr[i]} is ok`)
    //   i++
    // }, 1000);

    // this.youdao('optimistically').then(res => {
    //   console.log('is ok')
    // })

    // console.log(promiseArr)
    // arr.forEach(item => {
    //   promiseArr.push(this.youdao(item))
    // })

    let newDate = new Date()
    clockInModel.getDaysNum().then(res => {
      this.draw(`${newDate.getFullYear()}.${newDate.getMonth() + 1}`, newDate.getDate(), res)
    })
  },

  draw(date, day, dayNum) {
    var ctx = wx.createCanvasContext('customCanvas', this)

    let dateTextDis = ctx.measureText(date).width > 37 ? 22 : 27
    let dayTextDis = ctx.measureText(day).width > 11 ? 40 : 47

    ctx.setFillStyle('#FD0102')
    ctx.fillRect(0, 0, 280, 400)

    ctx.setStrokeStyle('#fff')
    ctx.setLineWidth(2)
    ctx.strokeRect(10, 10, 90, 65)

    ctx.setFillStyle('#fff')
    ctx.setFontSize(17)
    ctx.fillText(date, dateTextDis, 31)

    ctx.setFontSize(26)
    ctx.fillText(day, dayTextDis, 63)

    ctx.setTextAlign('center')
    ctx.setFontSize(34)
    ctx.fillText('我', 150, 120)
    ctx.setFontSize(16)
    ctx.fillText('已累计记单词', 150, 165)
    ctx.setFontSize(34)
    ctx.fillText(dayNum, 150, 220)
    ctx.setFontSize(26)
    ctx.fillText('天', 150, 270)

    ctx.setFillStyle('white')
    ctx.fillRect(5, 305, 270, 90)

    ctx.drawImage('/static/img/qd.jpg', 190, 310, 80, 80)

    ctx.setFillStyle('#000')
    ctx.setFontSize(14)
    ctx.fillText('记单词软件哪家强?', 75, 345)
    ctx.fillText('扫一扫，了解下~', 70, 370)

    ctx.draw()
    ctx.save()

    setTimeout(() => {
      wx.canvasToTempFilePath({
        canvasId: 'customCanvas',
        success: res => {
          this.triggerEvent('showPoster', {}, {})

          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: () => {
              this.triggerEvent('showPoster', {})
              wx.showToast({
                icon: 'none',
                title: '海报已保存到相册~'
              })
            },
            fail: (err) => {
              console.log(err)
            }
          })
        },
        fail: (err) => {
          console.log(err)
        }
      }, this)
    }, 1000);

  },

  youdao(word) {
    return new Promise((resolve, reject) => {
      this.getZn(word).then(this.getVoice).then(this.saveVoiceFile).then(this.saveVoice)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
          this.data.wordErrorlLocal.push(err)
          wx.setStorageSync('error_wordDetail', this.data.wordErrorlLocal)
        })
    })
  },

  getZn(word) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://api.shanbay.com/bdc/search/?word=${word}`,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          if (res.statusCode === 200) {
            let zn = res.data.data.cn_definition.defn.replace(/[\r\n]/g, "")
            zn = zn.replace(new RegExp("vt.", "g"), ",")
            zn = zn.replace(new RegExp("vi.", "g"), ",")
            zn = zn.replace(new RegExp("v.", "g"), ",")
            zn = zn.replace(new RegExp("n.", "g"), ",")
            zn = zn.replace(new RegExp("adj.", "g"), ",")
            zn = zn.replace(new RegExp("adv.", "g"), ",")
            zn = zn.replace(new RegExp("&", "g"), ",")
            resolve({ wordCon: word, zn: `${word}${zn}` })
          } else {
            reject(word)
          }
        },
        fail() {
          reject(word)
        }
      })
    })
  },

  getVoice(word) {
    // let salt = Math.random() * 1000
    // let sign = hex_md5(appKey + word.zn + salt + appScrect)

    return new Promise((resolve, reject) => {
      // wx.downloadFile({
      //   url: `https://openapi.youdao.com/ttsapi?q=${word.zn}&sign=${sign}&signType=v1&appKey=${appKey}&salt=${salt}&langType=zh-CHS&voice=0`,
      //   success(res) {
      //     if (res.tempFilePath.indexOf('.mp3') != -1) {
      //     resolve({ word: word.wordCon, path: res.tempFilePath })
      //   } else {
      //     reject(word.wordCon)
      //   }
      //   },
      //   fail(err) {
      //     reject(word.wordCon)
      //   }
      // })
      wx.downloadFile({
        url: `http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=${cuid}&tok=${tok}&tex=${encodeURI(encodeURI(word.zn))}&per=1&spd=5&pit=5&aue=3`,
        success(res) {
          if (res.tempFilePath.indexOf('.mp3') != -1) {
            resolve({ word: word.wordCon, path: res.tempFilePath })
          } else {
            reject(word.wordCon)
          }
        },
        fail(err) {
          reject(word.wordCon)
        }
      })
    })
  },

  saveVoiceFile(data) {
    let MyFile = new wx.BaaS.File()
    let fileParams = { filePath: data.path }
    let metaData = { categoryName: 'SDK' }

    return new Promise((resovle, reject) => {
      MyFile.upload(fileParams, metaData).then(res => {
        if (res.statusCode === 200) {
          resovle({word: data.word, path: res.data.path, file: res.data.file})
        } else {
          reject(data.word)
        }
      }, err => {
        reject(data.word)
      })
    })
  },

  saveVoice(data) {
    let tableName = 'word_voice'
    let Product = new wx.BaaS.TableObject(tableName)
    let product = Product.create()

    let apple = {
      word: data.word,
      path: data.path,
      file: data.file
    }

    return new Promise((resolve, reject) => {
      product.set(apple).save().then(res => {
        resolve(res)
      }, err => {
        reject(data.word)
      })
    })
  },
  
  // getSearch(word) {
  //   return new Promise((resolve, reject) => {
  //     wx.request({
  //       url: `https://api.shanbay.com/bdc/search/?word=${word}`, // 仅为示例，并非真实的接口地址
  //       data: {},
  //       header: {
  //         'content-type': 'application/json' // 默认值
  //       },
  //       success(res) {
  //         console.log(res)
  //         if (res.data.status_code != 0) {
  //           resolve(res.data.data.definition)
  //         }
  //         reject('get word detail error')
  //       },
  //       fail(err) {
  //         reject('get word detail error')
  //       }
  //     })
  //   })
  // },

   // getVoice(word) {
  //   return

  //   getZn(word).then(creatVoice).then(playVoice)

  //   function getZn(word) {
  //     return new Promise((resolve, reject) => {
  //       wx.request({
  //         url: `https://api.shanbay.com/bdc/search/?word=${word}`, 
  //         header: {
  //           'content-type': 'application/json' // 默认值
  //         },
  //         success(res) {
  //           let zn = res.data.data.cn_definition.defn.replace(/[\r\n]/g, "")
  //           zn = zn.replace(new RegExp("vt.", "g"), ",")
  //           zn = zn.replace(new RegExp("vi.", "g"), ",")
  //           zn = zn.replace(new RegExp("v.", "g"), ",")
  //           zn = zn.replace(new RegExp("n.", "g"), ",")
  //           zn = zn.replace(new RegExp("adj.", "g"), ",")
  //           zn = zn.replace(new RegExp("adv.", "g"), ",")
  //           zn = zn.replace(new RegExp("&", "g"), ",")
  //           resolve(`${word}${zn}`)
  //         }
  //       })
  //     })
  //   }

    creatVoice(str) {
      return new Promise((resolve, reject) => {
        wx.downloadFile({
          url: `http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=${cuid}&tok=${tok}&tex=${encodeURI(encodeURI(str))}&per=1&spd=5&pit=5&aue=3`,
          success(res) {
            console.log(res)
            resolve(res.tempFilePath)
          }
        })
      })
    }

  //   function playVoice(path) {
  //     ia.src = path
  //     ia.loop = true
  //     ia.play()
  //   }

  // },
})