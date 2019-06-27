// components/study/button-group/index.js
Component({
  externalClasses: ['dark-btn-wrapper', 'dark-color'],
  properties: {
    wordIndex: Number
  },

  data: {
    mood: 1
  },

  observers: {
    wordIndex: function(value) {
      if (value === 0) {
        this.setData({
          preBtnShow: false
        });
      } else {
        this.setData({
          preBtnShow: true
        });
      }
    }
  },

  methods: {
    unKnowHandle() {
      this.setData({
        mood: this.data.mood === 1 ? 2 : 1
      });
      this.triggerEvent("unKnowHandle", {}, {});
    },

    knowHandle() {
      wx.vibrateShort();
      this.triggerEvent("knowHandle", {}, {});
    },

    nextHandle() {
      wx.vibrateShort();
      this.setData({ mood: 1 });
      this.triggerEvent("nextHandle", {}, {});
    },

    preHandle() {
      wx.vibrateShort();
      this.setData({ mood: 1 });
      this.triggerEvent("preHandle", {}, {});
    }
  }
});
