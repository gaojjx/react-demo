import { connect } from 'dva'
import styles from './index.css'
import { Button, Table } from 'antd'
import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { UserDetailForm } from './components/UserDetail'


const UserComponent = ({ dispatch, list, query, userDetail }) => {
  const [showBulk, setShowBulk] = useState(false)
  const [selectedUserIds, setSelectedUserIds] = useState([])
  const { number, name, active, type, Page, PageSize } = query
  const showDetail = userId => {
    dispatch({
      type: 'user/detail',
      payload: userId,
    })
  }

  const columns = [
    {
      title: 'Number',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    // {
    //   title: 'College',
    //   dataIndex: 'college',
    //   key: 'college'
    // },
    // {
    //   title: 'Major',
    //   dataIndex: 'major',
    //   key: 'major'
    // },
    // {
    //   title: 'WeChatId',
    //   dataIndex: 'wechatid',
    //   key: 'wechatid'
    // },
    {
      title: 'CreatedTime',
      dataIndex: 'createdtime',
      key: 'createdtime',
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      render: text => text.toString()
    },
    // {
    //   title: 'PhoneNumber',
    //   dataIndex: 'phonenumber',
    //   key: 'phonenumber',
    // },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',

    },
    // {
    //   title: 'Reason',
    //   dataIndex: 'reason',
    //   key: 'reason',
    // },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: text => {
        return (
          <div>
            <UserDetailForm user={userDetail} userId={text} showDetail={showDetail}>
              <Button type='primary'>Detail</Button>
            </UserDetailForm>
          </div>
        )
      },
    },
  ]
  const rowSelection = {
    onChange: (rowSelectedKeys) => {
      if (rowSelectedKeys.length === 0) {
        setShowBulk(false)
      }
      if (!showBulk) setShowBulk(true)
      setSelectedUserIds(rowSelectedKeys)
    },
  }

  const handleBulkRecovery = () => {
    dispatch({
      type: 'user/bulkRecovery',
      payload: {
        userids: selectedUserIds
      }
    })
  }

  return (
    <div className={styles.normal}>
      <div className={styles.bulkRecovery}>
        {showBulk? <Button type="danger" onClick={handleBulkRecovery}>Recovery</Button>: null}
      </div>
      <Table
        dataSource={list}
        columns={columns}
        rowKey={user => user.id}
        rowSelection={rowSelection}
      />
    </div>
  )
}

const mapStateToProps = state => {
  const { list, number, name, active, type, Page, PageSize, detail } = state.user
  return {
    list,
    query: { number, name, active, type, Page, PageSize },
    userDetail: detail,
  }
}

export default connect(mapStateToProps)(UserComponent)
