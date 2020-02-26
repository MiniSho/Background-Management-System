import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './index.less'

import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memorysUtils'
import storageUtils from '../../utils/storageUtils'
import { Modal } from 'antd'

class Header extends Component {

    /**
     * 退出登录
     */

    logout = () => {
        // 显示确认提示
        Modal.confirm({
            title: 'Are you sure you want to exit?',
            onOk: () => {
                console.log('OK');
                // 确定后, 删除存储的用户信息
                // local中的
                storageUtils.removeUser()
                // 内存中的
                memoryUtils.user = {}
                // 跳转到主界面
                this.props.history.replace('/')
            },
            onCancel() {
                console.log('Cancel');
            },
        })

    }

    getTitle = () => {
        let title = ''
        const path = this.props.location.pathname
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title
            } else if (item.children) {
                const cItem = item.children.find(cItem => cItem.key === path)
                if (cItem) {
                    title = cItem.title
                }
            }
        })

        return title
    }
    render() {
        //Side Title
        const title = this.getTitle()
        const user = memoryUtils.user
        return (
            <div className="header">
                <div className="header-top">
                    Hello, {user.username} &nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="javasript:" onClick={this.logout} className='link'>Sign out</a>
                </div>
                <div className="header-bottom">
                    {title}
                </div>
            </div >
        )
    }
}

export default withRouter(Header)