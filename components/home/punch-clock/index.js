/*
 * @Author: your name
 * @Date: 2020-06-12 22:44:49
 * @LastEditTime: 2020-06-12 23:39:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /rereadWord/components/home/punch-clock/index.js
 */

// components/home/punch-clock/index.js
import { ClockInModel } from "../../../models/clockInModel.js";

const clockInModel = new ClockInModel();
const App = getApp();

Component({
  externalClasses: ["dark-color"],
  properties: {},

  pageLifetimes: {
    show: function () {
      // 获取 累计打卡天数
      let temData = App.globalData["user_clockIn"];
      if (temData != undefined) {
        this.setData({
          daysNum: temData.daysNum || 0,
        });
        return;
      }

      clockInModel.getClockInfo().then((res) => {
        if (res) {
          this.setData({
            daysNum: res.daysNum,
          });
        } else {
          this.setData({
            daysNum: 0,
          });
        }
      });
    },
  },

  data: {},

  methods: {},
});
