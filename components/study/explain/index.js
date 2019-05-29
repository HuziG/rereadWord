// components/study/explain/index.js


Component({
  properties: {
    wordCon: Object,
    explainShow: Boolean
  },

  data: {
    wordSentence: []
  },

  observers: {
    'wordCon': function (value) {
      if (value === null) { return }

      this.setData({
        word: value.wordExplatin.content,

        pron: value.wordExplatin.pron,
        definition: value.wordExplatin.definition,
        en_definition: value.wordExplatin.en_definition.defn,

        wordSentence: value.wordSentence
      })

      this.playVoice()
    }
  },

  methods: {
    playVoice() {
      // ia.src = this.data.wordCon.wordExplatin.audio
      // ia.play()
      this.triggerEvent('renderPlayVoice', { mp3_url: this.data.wordCon.wordExplatin.audio }, {})
    }
  }
})
