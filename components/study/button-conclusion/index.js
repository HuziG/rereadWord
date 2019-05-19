// components/study/button-conclusion/index.js
Component({
  properties: {

  },

  data: {
    second: 15,
    disalbed: true,
    nextShow: false
  },

  attached() {
    this.offDisabled()
  },

  methods: {
    offDisabled() {

      let interval = setInterval(() => {
        if (this.data.second === 0) {
          clearInterval(interval)
          this.setData({
            disalbed: false,
            nextShow: true
          })
          return
        }

        this.setData({
          second: this.data.second -= 1
        })
      },1000)

    },

    nextPage() {
      console.log('next')
    }
  }
})
