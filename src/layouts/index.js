import styles from './index.css'
import 'antd/dist/antd.css'
import { Layout, Menu } from 'antd'
import React from 'react'
import { Link } from 'umi'

const { Header, Content } = Layout

function BasicLayout(props) {
  return (
    <Layout>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys="['1']"
          style={{lineHeight: '64px'}}
        >
          <Menu.Item>
            <Link to="/user">User</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/record">Record</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          {props.children}
        </div>
      </Content>
    </Layout>
  )
}

export default BasicLayout
