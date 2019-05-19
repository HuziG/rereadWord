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
        console.log('stop play voice')
      } else {
        console.log('play voice')
      }
    }
  },

  methods: {

    playVoice() {
      this.setData({
        play: !this.data.play
      })
    }

  }
})

/**
 * 点击按钮，根据状态
 *  播放：执行播音程序，抛出播放url至成员变量，使用url播放音频(要有状态提示)
 *  
 */
