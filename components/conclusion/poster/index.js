// components/conclusion/poster/index.js
Component({
  properties: {
    date: String,
    day: String,
    dayNum: Number,
    startDraw: Boolean
  },

  data: {
   
  },

  observers: {
    'startDraw': function (value) {
      if (value) {
        this.draw(this.data.date, this.data.day, this.data.dayNum)
      }
    }
  },

  methods: {
    draw(date, day, dayNum) {
      var ctx = wx.createCanvasContext('customCanvas', this)

      let dateTextDis = ctx.measureText(date).width > 37 ? 22 : 27
      let dayTextDis = ctx.measureText(day).width > 11 ? 40 : 47

      ctx.setFillStyle('#FD0102')
      ctx.fillRect(0, 0, 280, 400)

      ctx.setStrokeStyle('#fff')
      ctx.setLineWidth(2)
      ctx.strokeRect(10, 10, 90, 65)

      ctx.setFillStyle('#fff')
      ctx.setFontSize(17)
      ctx.fillText(date, dateTextDis, 31)

      ctx.setFontSize(26)
      ctx.fillText(day, dayTextDis, 63)

      ctx.setTextAlign('center')
      ctx.setFontSize(34)
      ctx.fillText('我', 150, 120)
      ctx.setFontSize(16)
      ctx.fillText('已累计记单词', 150, 165)
      ctx.setFontSize(34)
      ctx.fillText(dayNum, 150, 220)
      ctx.setFontSize(26)
      ctx.fillText('天', 150, 270)

      ctx.setFillStyle('white')
      ctx.fillRect(5, 305, 270, 90)
      
      ctx.drawImage('/static/img/qd.jpg', 190, 310, 80, 80)

      ctx.setFillStyle('#000')
      ctx.setFontSize(14)
      ctx.fillText('记单词软件哪家强?', 75, 345)
      ctx.fillText('扫一扫，了解下~', 70, 370)

      ctx.draw()

      setTimeout(() => {
        this.triggerEvent('showPoster', {})
      }, 30000);
    }
  }
})
