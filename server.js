const Koa = require('koa')
const Router = require('koa-router')
const Redis = require('ioredis')
const next = require('next')
const session = require('koa-session')
const auth = require('./server/auth')
const api = require('./server/api')
const koaBody = require('koa-body')

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

  server.use(koaBody())

  server.use(session(SESSION_CONFIG, server))

  auth(server)
  api(server)

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

  server.use(router.routes())

  server.use(async (ctx, next) =>{
    ctx.req.session = ctx.session
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