// components/home/rember-info/index.js
import { cet4 } from '../../../static/data/cet4.js';
import { cet4_import } from '../../../static/data/cet4_import.js';
import { cet6 } from '../../../static/data/cet6.js';
import { cet6_import } from '../../../static/data/cet6_import.js';
import { kaoyan_import } from '../../../static/data/kaoyan_import.js'
import { kaoyan } from '../../../static/data/kaoyan.js'

Component({
  properties: {
    remWordNum: Number,
    offWord: Number,
    mode: String
  },

  data: {
    wordLibrary: [
      { name: 'cet4', key: cet4 },
      { name: 'cet4_import', key: cet4_import },
      { name: 'cet6', key: cet6 },
      { name: 'cet6_import', key: cet6_import },
      { name: 'kaoyan_import', key: kaoyan_import },
      { name: 'kaoyan', key: kaoyan }
    ]
  },

  observers: {
    'mode': function () {
      if (this.data.mode === '') { return }
      let lib = this.data.wordLibrary.find(item => {
        return item.name === this.data.mode
      })
      let libLength = lib.key.length
      this.setData({
        offWord: libLength - this.data.remWordNum
      })
    }
  },

  methods: {

  }
})
