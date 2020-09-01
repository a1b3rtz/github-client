import { useState, useCallback } from 'react'
import getConfig from 'next/config'
import { Layout, Input, Avatar, Tooltip, Dropdown, Menu } from 'antd'
import { GithubOutlined, UserOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

import Container from './Container'

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

const userDropDown = (
  <Menu>
    <Menu.Item>
      <a href="javascript:void(0)">Log out</a>
    </Menu.Item>
  </Menu>
)

const MyLayout = ({ children, user }) => {  
  const [search, setSearch] = useState('')

  const handleSearchChange = useCallback(e => {
    setSearch(e.target.value)
  }, [])

  const handleOnSearch = useCallback(() => {}, [])

  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <GithubOutlined style={githubIconStyle}/>
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
                    <a href={publicRuntimeConfig.OAUTH_URL}>
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
        #__next, .ant-layout {
          height: 100%
        }
        .ant-layout-header {
          padding-left: 0;
          padding-right: 0;
        }
      `}</style>
    </Layout>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(MyLayout)