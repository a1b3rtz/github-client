import { useState, useCallback } from 'react'

import Link from 'next/link'
import { Layout, Input, Avatar } from 'antd'
import { GithubOutlined, UserOutlined } from '@ant-design/icons'

const { Header, Content, Footer } = Layout

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

export default ({ children }) => {
  
  const [search, setSearch] = useState('')

  const handleSearchChange = useCallback(e => {
    setSearch(e.target.value)
  }, [])

  const handleOnSearch = useCallback(() => {}, [])

  return (
    <Layout>
      <Header>
        <div className="header-inner">
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
              <Avatar size={40} icon={<UserOutlined />}/>
            </div>
          </div>
        </div>
      </Header>
      <Content>{children}</Content>
      <Footer style={footerStyle}>
        Develop by Yuhao Zhang <a href="mailto:yuh.zhang@outlook.com">yuh.zhang@outlook.com</a>
      </Footer>

      <style jsx>{`
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
      `}</style>
    </Layout>
  )
}