// components/study/radio/index.js
import { StudyModel } from '../../../models/studyModel.js'

const studyModel = new StudyModel()
const appKey = '6db82689a464b1be'
const appScrect = 'vNTZqKd7cNE6E3khXSdHsNE4MoBgWUr8'

Component({
  properties: {
    word: String,
    zn: String
  },

  data: {
    play: false,
    voiceUrl: null
  },

  observers: {
    'word': function (value) {
      this.setData({
        voiceUrl: null,
        play: false
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
        this.getVoice(this.data.word).then(res => {
          return this.playVoice(res)
        })
      }
    },

    stop() {
      this.triggerEvent('stopPlayVoice', {}, {})
    },

    getVoice(word) {
      return new Promise((resolve, reject) => {
        studyModel.getWordZnVoice(word).then(path => {
          wx.downloadFile({
            url: path,
            success(res) {
              resolve(res.tempFilePath)
            },
            fail(err) {
              reject(err)
            }
          })
        }).catch(err => {
          wx.showToast({
            title: '错误，无语音~',
            icon: 'none',
            duration: 2000
          })
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