// components/home/rember-info/index.js
import { cet4 } from "../../../static/data/cet4.js";
import { cet4_import } from "../../../static/data/cet4_import.js";
import { cet6 } from "../../../static/data/cet6.js";
import { cet6_import } from "../../../static/data/cet6_import.js";
import { kaoyan_import } from "../../../static/data/kaoyan_import.js";
import { kaoyan } from "../../../static/data/kaoyan.js";

import { WordInfoModel } from "../../../models/wordInfoModel.js";

const wordInfoModel = new WordInfoModel();
const App = getApp();

Component({
  externalClasses: ['dark-text-vice-color'],
  properties: {
    remWordNum: Number,
    offWord: Number,
    mode: String
  },

  data: {
    wordLibrary: [
      { name: "cet4", key: cet4 },
      { name: "cet4_import", key: cet4_import },
      { name: "cet6", key: cet6 },
      { name: "cet6_import", key: cet6_import },
      { name: "kaoyan_import", key: kaoyan_import },
      { name: "kaoyan", key: kaoyan }
    ]
  },

  observers: {
    mode: function() {
      if (this.data.mode === "") {
        return;
      }
      let lib = this.data.wordLibrary.find(item => {
        return item.name === this.data.mode;
      });
      let libLength = lib.key.length;
      let offWord = libLength - this.data.remWordNum;
      if (offWord <= 0) {
        wordInfoModel.initWordInfo().then(res => {
          wx.showModal({
            title: "提示",
            content: "太棒了，您已经记完所有单词了",
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: "/pages/mode/mode"
                });
              }
            }
          });
        });
      } else {
        this.setData({
          offWord
        });
        this.triggerEvent("unLock", {});
      }
    }
  },

  ready() {
    setTimeout(() => {
      this.initData();
    }, 150);
  },

  methods: {
    initData() {
      let user_wordinfo = App.globalData["user_wordinfo"];
      let todayWordNum = wx.getStorageSync("today_word").data.length;

      this.setData({
        remWordNum: user_wordinfo.remWordNum,
        mode: user_wordinfo.mode,
        todayWordNum: todayWordNum
      });
    }
  }
});
