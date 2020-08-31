const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const session = require('koa-session')
const Redis = require('ioredis')
const auth = require('./server/auth')

const RedisSessionStore = require('./server/session-store')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

//create redis client
const redis = new Redis()

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  server.keys = ['albert develop github client']
  const SESSION_CONFIG = {
    key: 'jid',
    store: new RedisSessionStore(redis)
  }

  server.use(session(SESSION_CONFIG, server))

  //配置处理github OAuth登录
  auth(server)

  // server.use(async (ctx) => {
  //   if (ctx.cookies.get('jid')) {
  //     ctx.session = {}
  //   }
  //   await next()

  // })

  router.get('/api/user/info', async (ctx) => {
    const user = ctx.session.userInfo
    if (!user) {
      ctx.status = 401
      ctx.body = 'Need login'
    } else {
      ctx.body = user
      ctx.set('Content-Type', 'application/json')
    }
  })

  router.get('/a/:id', async (ctx) => {
    const id = ctx.params.id
    await handle(ctx.req, ctx.res, {
      pathname: '/a',
      query: { id }
    })
    ctx.respond = false
  })

  router.get('/b/:id', async (ctx) => {
    const id = ctx.params.id
    await handle(ctx.req, ctx.res, {
      pathname: '/b',
      query: { id }
    })
    ctx.respond = false
  })

  server.use(router.routes())

  server.use(async (ctx, next) =>{
    // ctx.cookies.set('id', 'userid: xxxxx')
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server.listen(3000, () => {
    console.log('server is listening on port 3000...')
  })
})