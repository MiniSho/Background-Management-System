import { Layout, Menu, Icon } from 'antd'
import React, { Component } from 'react'
import './homepage.less'

const { Footer, Header, Content } = Layout;

export default class Homepage extends Component {
    render() {
        return (
            <Layout>
                <Header className='homepage-header' style={{ height: '45px', background: 'rgba(0,0,0,0.8)', color: 'white' }} >
                    <Icon type="shopping-cart" />
                </Header>
                <Content style={{ background: 'white', height: '100%' }}>Content</Content>
                <Footer style={{ textAlign: 'center', color: 'rgba(0,0,0,0.3)' }}>Copyright © 2020 Sho Inc. All rights reserved.</Footer>
            </Layout>
        )
    }
}