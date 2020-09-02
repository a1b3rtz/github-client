import { useState, useCallback } from 'react'
import getConfig from 'next/config'
import { connect } from 'react-redux'
import axios from 'axios'
import { withRouter, Router } from 'next/router'
import Link from 'next/link'

import { Layout, Input, Avatar, Tooltip, Dropdown, Menu } from 'antd'
import { GithubOutlined, UserOutlined } from '@ant-design/icons'

import Container from './Container'
import { logout } from '../store/store'

const { Header, Content, Footer } = Layout

const { publicRuntimeConfig } = getConfig()

const githubIconStyle = {
  color: 'white',
  fontSize: 40,
  display: 'block',
  paddingTop: 10,
  marginRight: 20
}

const footerStyle = {
  textAlign: 'center'
}

const MyLayout = ({ children, user, logout, router }) => {  
  const urlQuery = router.query && router.query.query
  const [search, setSearch] = useState(urlQuery || '')

  const handleSearchChange = useCallback(e => {
    setSearch(e.target.value)
  }, [])

  const handleOnSearch = useCallback(() => {
    router.push(`/search?query=${search}`)
  }, [search])

  const handleLogout = useCallback(() => {
    logout()
  }, [logout])
  
  const handleGotoOAuth = useCallback(e => {
    e.preventDefault()
    axios.get(`/prepare-auth?url=${router.asPath}`)
      .then(res => {
        if (res.status === 200) {
          location.href = publicRuntimeConfig.OAUTH_URL
        } else {
          console.log('prepare auth failed', res)
        }
      }).catch(err => {
        console.log('prepare auth error', err)
      })
  }, [])

  const userDropDown = (
    <Menu>
      <Menu.Item>
        <a onClick={handleLogout}>Logout</a>
      </Menu.Item>
    </Menu>
  )

  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <Link href="/">
                <GithubOutlined style={githubIconStyle}/>
              </Link>
            </div>
            <div>
              <Input.Search 
                value={search} 
                onChange={handleSearchChange}
                onSearch={handleOnSearch}
                placeholder='Search'
              />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              {
                user && user.id ? (
                  <Dropdown overlay={userDropDown}>
                    <a href="/">
                      <Avatar size={40} src={user.avatar_url} />
                    </a>
                  </Dropdown>
                ) : (
                  <Tooltip title="Click to login">
                    <a href={`/prepare-auth?url=${router.asPath}`}>
                      <Avatar size={40} icon={<UserOutlined />}/>
                    </a>
                  </Tooltip>
                )
              }
            </div>
          </div>
        </Container>
      </Header>
      <Content>
        <Container>{children}</Container>
      </Content>
      <Footer style={footerStyle}>
        Develop by Yuhao Zhang <a href="mailto:yuh.zhang@outlook.com">yuh.zhang@outlook.com</a>
      </Footer>

      <style jsx>{`
        .content {
          color: red;
        }
        .header-inner {
          display: flex;
          justify-content: space-between;
        }
        .header-left {
          display: flex;
          justify-content: flex-start
        }
      `}</style>

      <style jsx global>{`
        #__next {
          height: 100%
        }
        .ant-layout {
          min-height: 100%;
        }
        .ant-layout-header {
          padding-left: 0;
          padding-right: 0;
        }
        .ant-layout-content {
          background: #fff;
        }
      `}</style>
    </Layout>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyLayout))