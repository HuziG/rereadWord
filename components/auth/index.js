// components/auth/index.js
Component({
  
  properties: {
    loading: Boolean
  },

  data: {
  },

  methods: {
    getPhoneNumber(e) {
      let o = {
        tel: 'null'
      }

      this.triggerEvent('getPhoneNumber', { value: o }, {})
    }
  }
})
