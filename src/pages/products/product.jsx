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
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api'
import LinkButton from '../../components/link-button'
import { PAGE_SIZE } from '../../utils/Constants'


const Option = Select.Option


export default class Product extends Component {
    state = {
        loading: false,
        products: [{
            'name': 'aaa'
        }, {
            'name': 'ddd'
        },
        {
            'name': 'bbb'
        }],
        total: 0,//书籍的总数量
        searchType: 'name',//默认安书籍名称搜索
        searchName: '',//搜索关键字
    }

    updateStatus = async (productId, status) => {
        status = status === 1 ? 2 : 1
        const result = await reqUpdateStatus(productId, status)
        if (result.status === 0) {
            message.success('update completed')
            this.getProducts(this.pageNum)
        }
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
                //dataIndex: 'status',
                render: ({ status, _id }) => {
                    let btnText = 'remove'
                    let text = 'for sale'
                    if (status === 2) {
                        btnText = 'on sale'
                        text = 'removed'
                    }
                    return (
                        <span>
                            <button onClick={() => { this.updateStatus(_id, status) }}> {btnText}</button><b />
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
     * 异步获取指定页码商品分页（可能再搜索）列表显示
     */

    getProducts = async (pageNum) => {
        // 保存当前请求的页码
        this.pageNum = pageNum
        const { searchName, searchType } = this.state
        let result
        // 发请求获取数据
        if (!this.isSearch) {
            result = await reqProducts(pageNum, PAGE_SIZE)
        } else {
            result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
        }


        if (result.status === 0) {
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
        this.getProducts(1)
    }
    render() {
        const { loading, products, total, searchType, searchName } = this.state
        const title = (
            <span>
                <Select
                    style={{ width: 120, marginLeft: 20 }}
                    value={searchType}
                    onChange={(value) => this.setState({ searchType: value })}
                >
                    <Option value="name">name</Option>
                    <Option value="ISBN">ISBN</Option>
                </Select>
                <Input
                    style={{ width: 200, margin: '0 15px' }}
                    placeholder="keyword"
                    value={searchName}
                    onChange={event => this.setState({ searchName: event.target.value })}
                />
                <Button type="primary" onClick={() => {
                    this.isSearch = true  // 保存搜索的标记
                    this.getProducts(1)
                }}>search</Button>
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
                    pagination={{
                        total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: this.getProducts,
                        current: this.pageNum
                    }}
                />
            </Card>
        )
    }
}