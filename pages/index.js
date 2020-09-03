import { request } from '../lib/api'
import { Button } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import getConfig from 'next/config'
import { connect } from 'react-redux'

import Repo from '../components/Repo'

const { publicRuntimeConfig } = getConfig()

const Index = ({ userRepos, userStarredRepos, user }) => {
  
  if (!user || !user.id) {
    return (
      <div className="root">
        <p>You haven't login yet</p>
        <Button type="primary" href={publicRuntimeConfig.OAUTH_URL}>Login</Button>
        <style jsx>{`
          .root {
            height: 400px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    )
  }
  return (
    <div className="root">
      <div className="user-info">
        <img src={user.avatar_url} alt="user avatar" className="avatar" />
        <span className="login">{user.login}</span>
        <span className="name">{user.name}</span>
        <span className="bio">{user.bio}</span>
        {user.email ? (
          <p className="email">
            <MailOutlined style={{ marginRight: 10}}/>
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </p>
        ) : null}
      </div>
      <div className="user-repos">
        {
          userRepos.map(repo => <Repo repo={repo} />)
        }
      </div>

      <style jsx>{`
        .root {
          display: flex;
          align-items: flex-start;
          padding: 20px 0;
        }
        .user-info {
          width: 200px;
          margin-right: 40px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
        }
        .login {
          font-weight: 800;
          font-size: 20px;
          margin-top: 20px;
        }
        .name {
          font-size: 16px;
          color: #777;
        }
        .bio {
          margin-top: 20px;
          color: #333;
        }
        .avatar {
          width: 100%;
          border-radius: 5px;
        }
        .user-repos {
          flex-grow: 1;
        }
      `}</style>
    </div>
  )
}

Index.getInitialProps = async ({ ctx, reduxStore }) => {

  const user = reduxStore.getState().user
  if (!user || !user.id) {
    return {
      isLogin: false
    }
  }

  const userRepos = await request(
    { 
      url: '/user/repos',
    }, 
    ctx.req,
    ctx.res
  )

  const userStarredRepos = await request( 
    {
      url: '/user/starred'
    },
    ctx.req,
    ctx.res
  )

  return {
    isLogin: true,
    userRepos: userRepos.data,
    userStarredRepos: userStarredRepos.data
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(Index)