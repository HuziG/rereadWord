// components/study/radio/index.js

const tok = '24.a530492f7418910f32f63eff80a10340.2592000.1560246717.282335-16231541'
const cuid = 'CC-2F-71-2E-04-C3'
var ia = ''

Component({
  properties: {
    word: String,
    zn: String
  },

  data: {
    play: false,
    refresh: true
  },

  observers: {
    'word': function (value) {
      this.setData({
        play: false,
        voiceUrl: null
      })
    }
  },

  methods: {

    playHandle() {
      let play = !this.data.play
      this.setData({
        play 
      })
      if (play) {
        this.play()
      } else {
        this.stop()
      }
    },

    play() {
      if (this.data.voiceUrl != null) {
        this.playVoice(this.data.voiceUrl)
      } else {
        this.getZn().then(this.creatVoice).then(res => {
          return this.playVoice(res)
        })
      }
    },

    stop() {
      this.triggerEvent('stopPlayVoice', {}, {})
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
         url: `https://wxapi.hotapp.cn/proxy/?appkey=hotapp673337801&url=http://tsn.baidu.com?lan=zh&ctp=1&cuid=${cuid}&tok=${tok}&tex=${encodeURI(encodeURI(str))}&per=1&spd=5&pit=5&aue=3`,
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
      this.setData({
        voiceUrl: path
      })
      this.triggerEvent('loopPlayVoice', { mp3_url: path }, {})
    }

  }
})