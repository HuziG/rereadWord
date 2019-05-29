// components/auth/index.js
Component({
  
  properties: {
    loading: Boolean
  },

  data: {
  },

  methods: {
    getPhoneNumber(e) {
      // let o = e.detail
      let o = {
        tel: 'null'
      }

      this.triggerEvent('getPhoneNumber', { value: o }, {})
      // console.log(e.detail.errMsg)
      // console.log(e.detail.iv)
      // console.log(e.detail.encryptedData)
    }
  }
})
