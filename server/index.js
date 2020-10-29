const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const views = require('koa-views')
const { resolve } = require('path')

const { connect, initSchemas, initAdmin  } = require('./database/init')

;(async () => {
  await connect()

  initSchemas()
  
  await initAdmin()
})()

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