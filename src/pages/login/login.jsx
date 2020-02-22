import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd';

import { reqLogin } from '../../api'
import './login.less'
import logo from './images/logo.png'

const Item = Form.Item




class Login extends Component {
    handleSubmit = e => {
        //阻止事件的默认行为：阻止表单的提交
        e.preventDefault();

        //取出输入的相关数据
        // const form = this.props.form
        // const values = form.getFieldsValue()
        // const username = form.getFieldValue('username')
        // const password = form.getFieldValue('password')
        // console.log(values, username, password)


        /**
         * 对所有字段统一验证（防止未填写提交）
         */
        this.props.form.validateFields(async (err, { username, password }) => {
            if (!err) {
                //alert(`send the ajax request of Signin, username = ${username}, password = ${password} `)
                const result = await reqLogin(username, password)
                //登陆成功
                if (result.status === 0) {
                    //跳转到管理界面
                    this.props.history.replace('/')
                    message.success('Welcome!')
                }
                //登录失败
                else {
                    message.error(result.msg)
                }
            } else {
                alert('false')
            }
        })
    }

    /**
     * 对用户名自定义验证
     */
    validateName = (rule, value, callback) => {
        value = value.trim()
        if (!value) {
            callback('Username is missing.')
        } else if (value.length < 4) {
            callback('At least 4 numbers or charactors.')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('Should be numbers,charactors or underline.')
        } else {
            callback()
        }
    }

    /**
     * 对密码自定义验证
     */
    validatePwd = (rule, value, callback) => {
        value = value.trim()
        if (!value) {
            callback('Password is missing.')
        } else if (value.length < 4) {
            callback('At least 4 numbers or charactors.')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('Should be numbers,charactors or underline.')
        } else {
            callback()
        }
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
                                    initialValue: '',
                                    rules: [
                                        // 第一种验证方法
                                        // { required: true, whitespace: true, message: 'Username is missing.' },
                                        // { min: 4, message: 'At least 4 numbers or characters.' }

                                        //第二种验证方法
                                        { validator: this.validateName }

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
                                    initialValue: '',//初始值
                                    rules: [
                                        { validator: this.validatePwd }
                                    ]
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