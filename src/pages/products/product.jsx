import {
    Card,
    Select,
    Input,
    Button,
    Icon,
    Table,
    message
} from 'antd'
import React, { Component } from 'react'
import { reqProducts } from '../../api'
import LinkButton from '../../components/link-button'

const Option = Select.Option


export default class Product extends Component {
    state = {
        loading: false,
        products: [],
        total: 0,//书籍的总数量
    }

    initColumns = () => {
        this.columns = [
            {
                //配置接口
                title: 'Name',
                dataIndex: 'name',
                width: 150

            },
            {
                title: 'Author',
                dataIndex: 'desc',
                width: 150
            },
            {
                title: 'ISBN',
                dataIndex: 'price',
                render: (price) => '$' + price,
                width: 150
            },
            {
                title: 'status',
                width: 100,
                dataIndex: 'status',
                render: (status) => {
                    let btnText = 'remove'
                    let text = 'for sale'
                    if (status === 2) {
                        btnText = ''
                    }
                    return (
                        <span>
                            <button> {btnText}</button><b />
                            <span> for sale</span>
                        </span >

                    )
                }
            },
            {
                title: 'action',
                width: "10 %",
                render: (product) => (
                    <span>
                        <LinkButton>edit</LinkButton>
                        <LinkButton>delete</LinkButton>
                    </span>
                )
            }

        ]
    }

    /**
     * 异步获取指定页码商品列表显示
     */

    getProduts = async (pageNum) => {
        const result = await reqProducts(pageNum, 2)
        if (result.data === 0) {
            const { total, list } = result.data
            //更新状态
            this.setState({
                products: list,
                total
            })
        }
    }

    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        // 获取一页显示
        this.getProduts(1)
    }
    render() {
        const { loading, products, total } = this.state
        const title = (
            <span>
                <Select style={{ width: 120, marginLeft: 20 }} value="1">
                    <Option value="1">name</Option>
                    <Option value="2">ISBN</Option>
                </Select>
                <Input style={{ width: 200, margin: '0 15px' }} placeholder="keyword" />
                <Button type="primary">search</Button>
            </span>
        )


        const extra = (
            <Button type="primary">
                <Icon type="plus" />
                add
            </Button>
        )

        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered={true}
                    rowKey="_id"
                    loading={loading}
                    columns={this.columns}
                    dataSource={products}
                    pagination={{ total, defaultPageSize: 2, showQuickJumper: true, onChange: this.getProducts }}
                />
            </Card>
        )
    }
}