import { Layout, Menu, Icon, Dropdown } from 'antd'
import React, { Component } from 'react'
import './homepage.less'

const { Footer, Header, Content } = Layout;

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                1st menu item
        </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                2nd menu item
        </a>
        </Menu.Item>
    </Menu>
);
export default class Homepage extends Component {
    render() {
        return (
            <Layout>
                <Header className='homepage-header' >

                </Header>
                <Content style={{ background: 'white' }}>Content</Content>
                <Footer style={{ textAlign: 'center', color: 'rgba(0,0,0,0.3)' }}>Copyright © 2020 Sho Inc. All rights reserved.</Footer>
            </Layout>
        )
    }
}