import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import './login.less'
import logo from './images/logo.png'

const Item = Form.Item


class Login extends Component {
    handleSubmit = e => {
        //阻止事件的默认行为：阻止表单的提交
        e.preventDefault();

        //取出输入的相关数据
        const form = this.props.form
        const values = form.getFieldsValue()
        const username = form.getFieldValue('username')
        const password = form.getFieldValue('password')


        console.log(values, username, password)

        alert('发送登录的ajax请求')
    }

    render() {

        const { getFieldDecorator } = this.props.form


        return (
            <div className='login'>
                <div className='login-header'>
                    <img src={logo} alt="logo" />
                    <h1>图书后台管理系统</h1>
                </div>
                <div className='login-content'>
                    <h1>Please sign in.</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                            {
                                getFieldDecorator('username', {//配置对象
                                    rules: [{ required: true, whitespace: true, message: 'Username is missing.' },
                                    { min: 4, message: 'At least 4 numbers or characters.' }
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                    />
                                )
                            }

                        </Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Password is missing' }]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                )
                            }

                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Sign in
                            </Button>
                        </Form.Item>
                    </Form>

                </div>

            </div>
        )
    }
}
const WrapperForm = Form.create()(Login)

export default WrapperForm