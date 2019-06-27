// components/mode/index.js
Component({
  externalClasses: ['dark-text-color'],
  properties: {},

  data: {
    modeArr: [
      {
        name: "四级词库",
        key: "cet4"
      },
      {
        name: "四级重点词库",
        key: "cet4_import"
      },
      {
        name: "六级词库",
        key: "cet6"
      },
      {
        name: "六级重点词库",
        key: "cet6_import"
      },
      {
        name: "考研词库",
        key: "kaoyan"
      },
      {
        name: "考研重点词库",
        key: "kaoyan_import"
      }
    ]
  },

  methods: {
    choiceMode(e) {
      this.triggerEvent("setMode", {
        mode: e.currentTarget.dataset.mode
      });
    }
  }
});
