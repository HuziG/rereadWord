// components/home/punch-clock/index.js
import { ClockInModel } from "../../../models/clockInModel.js";

const clockInModel = new ClockInModel();
const App = getApp();

Component({
  externalClasses: ['dark-color'],
  properties: {},

  data: {
  },

  ready() {
    // 获取 累计打卡天数
    let temData = App.globalData["user_clockIn"];
    if (temData != undefined) {
      this.setData({
        daysNum: temData.daysNum || 0
      });
      return;
    }

    clockInModel.getClockInfo().then(res => {
      this.setData({
        daysNum: res.daysNum || 0
      });
    });
  },

  methods: {}
});
