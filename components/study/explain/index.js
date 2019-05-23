// components/study/explain/index.js
import { StudyModel } from '../../../models/studyModel.js';

const studyModel = new StudyModel()

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

        wordSentence: value.wordSentence.slice(0, 3)
      })

      this.playVoice()
    }
  },

  methods: {
    playVoice() {
      let ia = wx.createInnerAudioContext()
      ia.src = this.data.wordCon.wordExplatin.audio
      ia.play()
    }
  }
})
