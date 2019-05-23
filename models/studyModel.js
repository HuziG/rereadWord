class StudyModel {
  getWordExplain(value) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://api.shanbay.com/bdc/search/?word=${value}`, 
        success(res) {
          if (res.data.status_code === 0) {
            resolve(res.data.data)
          } else {
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
          } else {
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
        o['wordExplatin'] = res
        return this.getWordSentence(res.id)
      }).then(res => {
        o['wordSentence'] = res
        resolve(o)
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
}

export {
  StudyModel
}