// components/study/explain/index.js
Component({
  externalClasses: ['dark-text-color','dark-text-vice-color'],
  properties: {
    wordCon: Object,
    explainShow: Boolean,
    redoRotate: {
      type: Boolean,
      value: false
    }
  },

  data: {
    wordSentence: []
  },

  observers: {
    wordCon: function(value) {
      if (value === null) {
        return;
      }

      this.setData({
        word: value.wordExplatin.content,

        pron: value.wordExplatin.pron,
        definition: value.wordExplatin.definition,
        en_definition: value.wordExplatin.en_definition.defn,

        wordSentence: value.wordSentence,

        redoRotate: false
      });

      this.stop();
      this.playVoice();
    }
  },

  methods: {
    playVoice() {
      if (this.data.redoRotate) {
        this.setData({
          redoRotate: false
        });
      }
      this.triggerEvent(
        "initPlayVoice",
        { mp3_url: this.handleVoice(this.data.wordCon.wordExplatin.audio) },
        {}
      );
    },

    handleVoice(url) {
      return url.replace(/http/g, "https");
    },

    loopWordVoice() {
      let _redoRotate = this.data.redoRotate;
      this.setData({
        redoRotate: !_redoRotate
      });
      if (_redoRotate) {
        this.triggerEvent("stopPlayVoice", {}, {});
      } else {
        this.triggerEvent(
          "loopPlayVoice",
          { mp3_url: this.handleVoice(this.data.wordCon.wordExplatin.audio) },
          {}
        );
      }
    },

    stop() {
      this.triggerEvent("stopPlayVoice", {}, {});
    }
  }
});
