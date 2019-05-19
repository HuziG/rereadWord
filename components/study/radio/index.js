// components/study/radio/index.js
Component({
  properties: {

  },

  data: {
    play: false
  },

  observers: {
    'play': function (play) {
      if (play === false) {
        this.stop()
      } else {
        this.play()
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
      console.log('play voice')
    },

    stop() {
      console.log('stop play voice')
    }

  }
})

/**
 * 点击按钮，根据状态
 *  播放：执行播音程序，抛出播放url至成员变量，生成音频管理器，使用url播放音频(要有loading提示)
 *  暂停：执行暂停程序
 */
