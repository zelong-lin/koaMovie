// 处理mongoose的通用工具方法
const mongoose = require('mongoose')
const glob = require('glob')
const { resolve } = require('path')

// mongoose本身的Promise用户体验不好,故赋予全局的promise
mongoose.Promise = global.Promise

// 抛出model
exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}

// 抛出管理员账号模块
exports.initAdmin = async () => {
  const User = mongoose.model('User')
  let user = await User.findOne({
    username: 'Scott'
  })

  if (!user) {
    const user = new User({
      username: 'Scott',
      email: 'koa2@imooc.com',
      password: '123abc'
    })

    await user.save()
  }
}

// 启动mongoose的统一处理
const db = 'mongodb://localhost/douban-test'
exports.connect = () => {
  let maxConnectTimes = 0

  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }

    mongoose.connect(db)

    mongoose.connection.on('disconnected', () => {
      maxConnectTimes++

      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库挂了吧，快去修吧少年')
      }
    })

    mongoose.connection.on('error', err => {
      maxConnectTimes++

      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库挂了吧，快去修吧少年')
      }
    })

    mongoose.connection.once('open', () => {
      // const Dog = mongoose.model('Dog', { name: String })
      // const doga = new Dog({ name: '阿尔法' })

      // doga.save().then(() => {
      //   console.log('wang')
      // })
      resolve()
      console.log('MongoDB Connected successfully!')
    })
  })
}