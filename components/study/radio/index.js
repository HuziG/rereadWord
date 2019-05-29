// components/study/radio/index.js

const tok = '24.a530492f7418910f32f63eff80a10340.2592000.1560246717.282335-16231541'
const cuid = 'CC-2F-71-2E-04-C3'
var ia = ''

Component({
  properties: {
    word: String,
    zn: String,
    stopPlay: Boolean
  },

  data: {
    play: false
  },

  observers: {
    'play': function (play) {
      if (!play) {
        this.stop()
      } else {
        this.play()
      }
    },
    'stopPlay': function (value) {
      if (value) {
        this.stop()
        this.setData({
          play: false
        })
      }
    }
  },

  methods: {

    playHandle() {
      this.setData({
        play: !this.data.play
      })
    },

    play() {
      this.getZn().then(this.creatVoice).then(this.playVoice)
    },

    stop() {
      if (ia === '') { return } 
      ia.stop()
    },

    getZn() {
      return new Promise((resolve, reject) => {
        let zn = this.data.zn.replace(/[\r\n]/g, "")
        zn = zn.replace(new RegExp("vt.", "g"), ",");
        zn = zn.replace(new RegExp("vi.", "g"), ",");
        zn = zn.replace(new RegExp("v.", "g"), ",");
        zn = zn.replace(new RegExp("n.", "g"), ",");
        zn = zn.replace(new RegExp("adj.", "g"), ",");
        zn = zn.replace(new RegExp("adv.", "g"), ",");
        resolve(`${this.data.word}${zn}`)
      })
    },

    creatVoice(str) {
     return new Promise((resolve, reject) => {
       wx.downloadFile({
         url: `http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=${cuid}&tok=${tok}&tex=${encodeURI(encodeURI(str))}&per=1&spd=5&pit=5&aue=3`,
         success(res) {
           resolve(res.tempFilePath)
         },
         fail(err) {
           reject(err)
         }
       })
     })
    },

    playVoice(path) {
      ia = wx.createInnerAudioContext()
      ia.src = path
      ia.loop = true
      ia.play()
    }

  }
})

/**
 * 点击按钮，根据状态
 *  播放：执行播音程序，抛出播放url至成员变量，生成音频管理器，使用url播放音频(要有loading提示)
 *  暂停：执行暂停程序
 */
