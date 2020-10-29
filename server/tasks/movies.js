// child_process 创建子进程爬取数据
const cp = require('child_process')
const { resolve } = require('path')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')

;(async () => {
  const script = resolve(__dirname, '../crawler/trailer-list')
  const child = cp.fork(script, [])
  let invoked = false

  child.on('error', err => {
    if (invoked) return

    invoked = true

    console.log(err)
  })

  child.on('exit', code => {
    if (invoked) return

    invoked = false
    let err = code === 0 ? null : new Error('exit code ' + code)

    console.log(err)
  })

  child.on('message', data => {
    let result = data.result
    result.forEach(async item => {
      let movie = await Movie.findOne({ // 判断id是否存在
        doubanId: item.doubanId
      })

      if (!movie) {
        movie = new Movie(item)  // 传入数据
        await movie.save()  // 保存数据
      }
    })
  })
})()