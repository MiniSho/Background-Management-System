import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import memorysUtils from '../../utils/memorysUtils'
import { Layout } from 'antd'
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';

import AdminHome from '../home/home'
import Product from '../products/product'
import Role from '../role/role'
import User from '../user/user'
import Book from '../book/book'
import Bar from '../charts/bar.jsx'
import Line from '../charts/line'
import Pie from '../charts/pie.jsx'

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
    render() {

        //读取保存的user,如果不存在，直接跳转到登录界面
        //const user = JSON.parse(localStorage.getItem('user_key') || '{}')
        const user = memorysUtils.user


        if (!user._id) {
            //this.props.history.replace('/login')//事件回调函数中进行路由跳转
            return <Redirect to='/login' />//自动跳转到指定的路由路径
        }
        return (
            <Layout style={{ height: '100vh' }}>
                <Sider style={{ background: 'rgba(0,0,0,0.8)' }} >
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header />
                    <Content style={{ background: 'white' }}>
                        <Switch>
                            <Route path='/admin' exact component={AdminHome} />
                            <Route path='/admin/products' component={Product} />
                            <Route path='/admin/role' component={Role} />
                            <Route path='/admin/user' component={User} />
                            <Route path='/admin/book' component={Book} />
                            <Route path='/admin/charts/bar' component={Bar} />
                            <Route path='/admin/charts/line' component={Line} />
                            <Route path='/admin/charts/pie' component={Pie} />
                            <Redirect to='/admin' />
                        </Switch>

                    </Content>
                    <Footer style={{ textAlign: 'center', color: 'rgba(0,0,0,0.3)' }}>Copyright © 2020 Sho Inc. All rights reserved.</Footer>
                </Layout>
            </Layout>
        )
    }
}