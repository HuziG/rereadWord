// components/study-exam/option-group/index.js
import { cet6 } from "../../../static/data/cet6.js";

Component({
  externalClasses: ['dark-btn-wrapper'],
  properties: {
    answer: String
  },
  
  data: {

  },

  observers: {
    'answer': function (value) {
      if (value === '') { return }
      this.orgOptionData(value)
    }
  },

  methods: {
    optionClick(event) {
      if (this.data.answerDetail && this.data.answerDetail.correct) { return }
      let index = event.currentTarget.dataset.index
      let correct = this.data.optionArr[index] === this.data.answer
      this.setData({
        answerDetail: {
          index,
          correct
        }
      })
      if (correct) {
        this.triggerEvent('ansRightHandle', {}, {})
      }
    },

    orgOptionData(word) {
      let temData = [word]

      while (temData.length < 4) {
        let num = Math.floor(Math.random() * (cet6.length - 2) + 1)
        let temWord = cet6[num]
        if (temWord != word) {
          temData.push(temWord)
        }
      }

      temData = temData.sort(function (a, b) { return Math.random() > .5 ? -1 : 1; })

      this.setData({
        optionArr: temData
      })
    }
  }
})
