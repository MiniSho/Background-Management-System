/**
 * 
 * 待优化
 * 
 */

import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon, Button } from 'antd'

import menuList from '../../config/menuConfig'
import logo from '../../assets/images/logo.png'
import './index.less'

const { SubMenu } = Menu

class LeftNav extends Component {
    getMenuNodes = (menuList) => {
        // 得到当前请求的path
        const path = this.props.location.pathname

        return menuList.reduce((pre, item) => {
            // 判断当前用户是否有此item对应的权限

            if (!item.children) {
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            } else {

                //判断当前item的key是否是我需要的openKey

                const cItem = item.children.find(cItem => cItem.Key === path)
                if (cItem) {
                    this.openKey = item.Key
                }

                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                ))
            }


            return pre
        }, [])
    }


    render() {
        const menuNodes = this.getMenuNodes(menuList)
        const selectKey = this.props.location.pathname

        console.log('selectKey', selectKey)
        console.log('openKey', this.openKey)

        return (
            <div className="left-nav">
                <Link className='left-nav-link ' to='/home'>
                    <img src={logo} alt="logo" />
                    <h1>Pokémon Center</h1>
                </Link>

                <Menu
                    selectedKeys={[this.openKey]}
                    mode="inline"
                    theme="dark"
                    type="primary"
                >{
                        menuNodes
                    }

                </Menu>
            </div>
        )
    }
}
/** 向外暴露 使用高阶组件 withRouter()来包装非路由组件
 * 目的：LeftNav可以操作路由组件的操作
 */
export default withRouter(LeftNav)