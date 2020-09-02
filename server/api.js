const axios = require('axios')
const github_base_url = 'https://api.github.com'

module.exports = (server) => {
  server.use(async (ctx, next) => {
    path = ctx.path
    if (path.startsWith('/github/')) {

      const githubAuth = ctx.session.githubAuth
      const githubPath = `${github_base_url}${ctx.url.replace('/github/', '/')}`
      
      const token = githubAuth && githubAuth.access_token
      let headers = {}
      if (token) {
        console.log('token_type', githubAuth.token_type)
        console.log('githubAuth', githubAuth)
        headers['Authorization'] = `${githubAuth.token_type} ${token}`
      }

      try {
        const result = await axios({
          method: 'GET',
          url: githubPath,
          headers
        })
        if (result.status === 200) {
          ctx.body = result.data
          ctx.set('Content-Type', 'application/json')
        } else {
          ctx.status = result.status
          ctx.body = {
            success: false,
          }
        }
      } catch (e) {
        console.log(e)
        ctx.body = {
          success: false,
        }
        ctx.set('Content-Type', 'application/json')
      }

    } else {
      await next()
    }
  })
}