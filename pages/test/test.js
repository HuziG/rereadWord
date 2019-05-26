//index.js

import { cet4 } from '../../static/data/cet4.js';
import { cet4_import } from '../../static/data/cet4_import.js';
import { cet6 } from '../../static/data/cet6.js';
import { cet6_import } from '../../static/data/cet6_import.js';
import { kaoyan_import } from '../../static/data/kaoyan_import.js'
import { kaoyan } from '../../static/data/kaoyan.js'

var tok = '24.a530492f7418910f32f63eff80a10340.2592000.1560246717.282335-16231541'
var cuid = 'CC-2F-71-2E-04-C3'
var ia = wx.createInnerAudioContext()

import { ClockInModel } from '../../models/clockInModel.js'

const clockInModel = new ClockInModel()

Page({
  data: {},

  onLoad() {
    // this.getVoice('cat')

    // this.getExample(1521)

    clockInModel.getDaysNum().then(res => {
      console.log(res)
    })
  },

  getVoice(word) {
    return

    getZn(word).then(creatVoice).then(playVoice)

    function getZn(word) {
      return new Promise((resolve, reject) => {
        wx.request({
          url: `https://api.shanbay.com/bdc/search/?word=${word}`, 
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            let zn = res.data.data.cn_definition.defn.replace(/[\r\n]/g, "")
            zn = zn.replace(new RegExp("vt.", "g"), ",");
            zn = zn.replace(new RegExp("vi.", "g"), ",");
            zn = zn.replace(new RegExp("v.", "g"), ",");
            zn = zn.replace(new RegExp("n.", "g"), ",");
            zn = zn.replace(new RegExp("adj.", "g"), ",");
            zn = zn.replace(new RegExp("adv.", "g"), ",");
            resolve(`${word}${zn}`)
          }
        })
      })
    }

    function creatVoice(str) {
      return new Promise((resolve, reject) => {
        wx.downloadFile({
          url: `http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=${cuid}&tok=${tok}&tex=${encodeURI(encodeURI(str))}&per=1&spd=5&pit=5&aue=3`,
          success(res) {
            resolve(res.tempFilePath)
          }
        })
      })
    }

    function playVoice(path) {
      ia.src = path
      ia.loop = true
      ia.play()
    }

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
  //         resolve(res.data.data)
  //       }
  //     })
  //   })
  // }

  getExample(id) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://api.shanbay.com/bdc/example/?vocabulary_id=${id}`, // 仅为示例，并非真实的接口地址
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          resolve(res.data.data)
        }
      })
    })
  }
})