// components/home/welcome/index.js
Component({
  properties: {
    title: String,
    animate: String
  },

  data: {
    
  },

  attached() {
    let hours = new Date().getHours()
    if (hours >= 6 && hours <= 13) {
      this.setData({
        title: 'Good Morining'
      })
    }
    if (hours > 13 && hours <= 18) {
      this.setData({
        title: 'Good Afternoon'
      })
    }
    if (hours > 18) {
      this.setData({
        title: 'Good Evening'
      })
    }
  },

  methods: {

  }
})
