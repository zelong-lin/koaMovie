const Koa = require('koa')
const app = new Koa()
const { htmlTpl, ejsTpl } = require('./tpl')
const ejs = require('ejs')

app.use(async (ctx, next) => {
  ctx.type = 'text/html; charset=utf-8'
  ctx.body = ejs.render(ejsTpl, {
    you: 'Luke',
    me: 'Scott'
  })
})
app.listen(4455)