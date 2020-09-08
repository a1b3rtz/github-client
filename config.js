require('dotenv').config()

const GITHUB_OAUTH_URL = process.env.GITHUB_OAUTH_URL
const SCOPE = process.env.SCOPE
const client_id = process.env.CLIENT_ID

const config = {
  github: {
    request_token_url: process.env.REQUEST_TOKEN_URL,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET
  },
  GITHUB_OAUTH_URL,
  OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`
}

module.exports = config