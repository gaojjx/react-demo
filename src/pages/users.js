import {connect, routerRedux} from 'dva'
import styles from './users.css';
import { Table, Button, Popconfirm, Divider, Pagination } from 'antd';
import { UserModel } from '../components/UserModel';
import { useState } from 'react';
import Link from 'umi/link'

const Users = ({dispatch, list, total, page, pageSize}) => {
  const handleDelete = id => {
    dispatch({
      type: 'users/remove',
      payload: id
    })
  }

  const handleChangePage = (page, pageSize) => {
    dispatch(routerRedux.push({
      pathname: '/users',
      query: { page, pageSize },
    }));
  }

  const handleEdit = user => {
    dispatch({
      type: 'users/update',
      payload: user
    })
  }

  const handleCreate = user => {
    dispatch({
      type: '/users/create',
      payload: user
    })
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Operation',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => {
        return (
          <div>
            <Link to={`/record/${record.id}`}><Button>Link</Button></Link>
            <Divider type="vertical" />
            <UserModel user={record} title="Edit User" onCreate={handleEdit} >
              <Button>Edit</Button>
            </UserModel>
            <Divider type="vertical" />
            <Popconfirm title="confirm to delete?" onConfirm={() => handleDelete(record.id)}>
              <Button type="danger">Delete</Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ]
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (!showBulkDelete && selectedRowKeys.length > 0) {
        setShowBulkDelete(true)
        // console.log(selectedRowKeys)
      }
      setSelectedRowKeys(selectedRowKeys)
      if (showBulkDelete && selectedRowKeys.length === 0) {
        setShowBulkDelete(false)
        setSelectedRowKeys([])
      }
    }
  }
  const handleBulkDelete = () => {
    dispatch({
      type: 'users/bulkDelete',
      payload: {
        recordidlist: selectedRowKeys.map(key => key.toString())
      }
    })
  }
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [showBulkDelete, setShowBulkDelete] = useState(false)
  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          {showBulkDelete? <Button onClick={handleBulkDelete} type="danger">Delete</Button>: null}
          <UserModel user={{}} title="Create New User" onCreate={handleCreate} >
            <Button type="primary">Create</Button>
          </UserModel>
        </div>
        <Table dataSource={list} columns={columns} rowKey={record => record.id} pagination={false} rowSelection={rowSelection} />
        <Pagination current={page} pageSize={pageSize} total={total} onChange={handleChangePage} />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  const {list, total, page, pageSize} = state.users
  return {
    list,
    total,
    page,
    pageSize
  }
}

export default connect(mapStateToProps)(Users)