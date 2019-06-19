class StudyModel {
  getWordExplain(value) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://api.shanbay.com/bdc/search/?word=${value}`, 
        success(res) {
          if (res.data.status_code === 0) {
            resolve(res.data.data)
          }
          if (res.data.status_code != 0) {
            reject(true)
          }
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }

  getWordSentence(id) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://api.shanbay.com/bdc/example/?vocabulary_id=${id}`,
        success(res) {
          if (res.data.status_code === 0) {
            resolve(res.data.data)
          }
          if (res.data.status_code != 0) {
            reject(true)
          }
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }

  getWordInfoHandle(value) {
    return new Promise((resolve, reject) => {
      let o = {}
      this.getWordExplain(value).then(res => {
        if (res != 'break') {
          o['wordExplatin'] = res
          return this.getWordSentence(res.id)
        }
      }).then(res => {
        o['wordSentence'] = res.slice(0, 3)
        resolve(o)
      }).catch(res => {
        resolve('null')
      })
    })
  }

  getWordZnVoice(word) {
    return new Promise((resolve, reject) => {
      let query = new wx.BaaS.Query()

      query.compare('word', '=', word)

      let Product = new wx.BaaS.TableObject('word_voice')
      Product.setQuery(query).find().then(res => {
        if (res.statusCode === 200 && res.data.objects.length != 0) {
          resolve(res.data.objects[0].path)
        } else {
          reject(true)
        }
      }, err => {
        reject(err)
      })
    })
  }

  forOrgWordInfo(value) {
    let that = this
    let promiseArr = []

    value.forEach(item => {
      promiseArr.push(creatPromise(item))
    })

    return new Promise((resolve, reject) => {
      Promise.all(promiseArr).then(res => {
        res = this.filterWordArr(res)
        resolve(res)
      })
    })

    function creatPromise(value) {
      var promise;
      promise = new Promise(function (resolve, reject) {
        that.getWordInfoHandle(value).then(res => {
          resolve(res)
        })
      });
      return promise;
    }
  }

  filterWordArr(value) {
    value.forEach((item, index, arr) => {
      if (item === 'null') {
        value.splice(index, 1)
      }
    });
    return value
  }

  // ------------------------------------ 2.0.0 -------------------------------------------

  getWordSentenceArr(data) {
    let that = this
    let promiseArr = []

    data.forEach(item => {
      promiseArr.push(creatrPromise(item.id))
    })

    return new Promise((resolve, reject) => {
      Promise.all(promiseArr).then(res => {
        let rData = filterArr(res)
        resolve(rData)
      })
    })

    function creatrPromise(id) {
      return that.getWordSentence(id)
    }

    function filterArr(data) {
      data = data.map(item => {
        let _item = item[0]
        return { annotation: _item.annotation, translation: _item.translation, word: _item.word }
      })
      return data
    }
  }

  getSentenceVoice(sentence) { // 获取例句语音文件
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(sentence)}&le=eng`,
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.tempFilePath)
          } else {
            resolve(null)
          }
        },
        fail: () => {
          resolve(null)
        }
      })
    })
  } 

  getCorrectVoice() {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: 'https://cloud-minapp-27202.cloud.ifanrusercontent.com/1hd2cNPRQEGkjfPV.mp3',
        success: (result) => {
          if (result.statusCode === 200) {
            resolve(result.tempFilePath)
          } else {
            resolve(null)
          }
        },
        fail: () => {
          resolve(null)
        }
      })
    })
  }
}

export {
  StudyModel
}