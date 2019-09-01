// components/study/radio/index.js
import { StudyModel } from "../../../models/studyModel.js";

const studyModel = new StudyModel();

Component({
  externalClasses: ['dark-btn-wrapper'],
  properties: {
    word: {
      type: String,
      observer: function() {
        this.setData({
          voiceUrl: null,
          play: false
        });
      }
    },
    zn: String,
    play: {
      type: Boolean,
      value: false
    }
  },

  data: {
    voiceUrl: null
  },

  methods: {
    playHandle() {
      let play = !this.data.play;
      this.setData({
        play
      });
      if (play) {
        this.play();
      } else {
        this.stop();
      }
    },

    play() {
      if (this.data.voiceUrl != null) {
        this.playVoice(this.data.voiceUrl);
      } else {
        this.getVoice(this.data.word).then(res => {
          return this.playVoice(res);
        });
      }
    },

    stop() {
      this.triggerEvent("stopPlayVoice", {}, {});
    },

    getVoice(word) {
      return new Promise((resolve, reject) => {
        studyModel
          .getWordZnVoice(word)
          .then(path => {
            wx.downloadFile({
              url: path,
              success(res) {
                resolve(res.tempFilePath);
              },
              fail(err) {
                reject(err);
              }
            });
          })
          .catch(err => {
            wx.showToast({
              title: "错误，无语音~",
              icon: "none",
              duration: 2000
            });
          });
      });
    },

    playVoice(path) {
      this.setData({
        voiceUrl: path
      });
      this.triggerEvent("loopPlayVoice", { mp3_url: path }, {});
    }
  }
});
