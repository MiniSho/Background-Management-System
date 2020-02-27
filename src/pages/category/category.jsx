import { Layout, message, Modal } from 'antd'
import Highlighter from 'react-highlight-words';
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
    Card,
    Button,
    Icon,
    Table,
    Input
} from 'antd'

import { reqBookInfos } from '../../api'

const { Footer, Header, Content } = Layout;
const data = [
    {
        key: '1',
        name: 'John Brown',
        author: 32,
        cover: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Joe Black',
        author: 42,
        cover: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Jim Green',
        author: 32,
        cover: 'Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        author: 32,
        cover: 'London No. 2 Lake Park',
    },
    {
        key: '5',
        name: 'Jim Red',
        author: 32,
        cover: 'London No. 2 Lake Park',
    },
    {
        key: '6',
        name: 'Jim Red',
        author: 32,
        cover: 'London No. 2 Lake Park',
    },

];



class Category extends Component {
    state = {
        searchText: '',
        searchedColumn: '',
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
            </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
            </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                    text
                ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    state = {
        categorys: [],// 所有分类的数组
        showStatus: 0, // 0: 不显示， 1：显示添加，2：显示修改
    }

    // getBookInfos = () => {
    //     const result = await reqBookInfos()
    //     if (result.status === 0) { //成功
    //         const categorys = result.data
    //         //更新状态BookInfos数据
    //         this.setState({
    //             categorys
    //         })

    //     } else {
    //         message.error('获取分类列表失败')
    //     }
    // }

    // componentDidMount() {
    //     this.getBookInfos()
    // }

    /**
     * 异步获取分类列表显示
     */


    /** 
    点击确定的回调：添加/修改信息
     */
    handleOk = () => {

    }

    /**
     * 点击取消的回调
     */

    handleCancel = () => {
        this.setState({
            showStatus: 0
        })
    }
    render() {


        //取出状态数据
        const { categorys, loading, showStatus } = this.state

        const columns = [

            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: '15%',
                ...this.getColumnSearchProps('name'),
                align: 'center'
            },
            {
                title: 'Author',
                dataIndex: 'author',
                key: 'author',
                width: '15%',
                ...this.getColumnSearchProps('author'),
                align: 'center'
            },
            {
                title: 'Cover',
                dataIndex: 'cover',
                key: 'cover',
                width: '20%',
                ...this.getColumnSearchProps('cover'),
                align: 'center'
            },
            {
                title: 'ISBN',
                dataIndex: 'ISBN',
                key: 'ISBN',
                width: '15%',
                ...this.getColumnSearchProps('ISBN'),
                align: 'center'
            },
            {
                title: 'Inventory',
                dataIndex: 'inventory',
                key: 'inventory',
                width: '10%',
                ...this.getColumnSearchProps('inventory'),
                align: 'center'
            },
        ];
        const _extra = (
            <Button type="primary" style={{ marginRight: '100px' }}>
                <Icon type="plus" />
                add
            </Button>
        )



        return (
            // <Card extra={extra} style={{ marginLeft: 50, marginRight: 50, height: 100 }}>
            //     <Table columns={columns} dataSource={data} bordered />
            // </Card>

            <Card extra={_extra}>
                <Table
                    columns={columns}
                    dataSource={data}
                    style={{ marginLeft: '50px', marginRight: '50px' }}
                    bordered
                    loading={true}
                    pagination={{ defaultPageSize: 6, hideOnSinglePage: true, showQuickJumper: true }}
                />

                <Modal
                    title={showStatus === 1 ? "add" : "edit"}
                    visible={showStatus !== 0}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >

                </Modal>
            </Card>

        )
    }
}

export default withRouter(Category)