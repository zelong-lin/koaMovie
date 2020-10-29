const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const views = require('koa-views')
const { resolve } = require('path')
const router = require('./routes')

const { connect, initSchemas, initAdmin  } = require('./database/init')

;(async () => {
  await connect()

  initSchemas()
  // require('./tasks/movies')
  await initAdmin()
})()
app.use(router.routes()).use(router.allowedMethods()) // router的基本用法，引入路由文件和允许所有路由方法

app.use(views(resolve(__dirname, './views'), {
  extension: 'pug'
}))

app.use(async (ctx, next) => {
  await ctx.render('index', {
    you: 'aaa',
    me: 'bbbb',
  })
})

app.listen(4455)