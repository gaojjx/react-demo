import styles from './record.css';
import { connect } from 'dva';
import { Button, Table, Modal, Form, Input, InputNumber } from 'antd';
import { RecordModel } from '../components/RecordModel';
import 'antd/dist/antd.css';
import { useState } from 'react';

const Records = ({dispatch, list, page, type}) => {
  const [showBulkButton, setShowBulkButton] = useState(false)
  const [rowSelectKeys, setRowSelectKeys] = useState([])
  const handleUpdate = record => {
    dispatch({
      type: 'record/update',
      payload: {
        recordId: record.id,
        query: {Page: page}
      }
    })
  }

  const handleCreate = record => {
    dispatch({
      type: 'record/create',
      payload: {record, query: {Page: page}}
    })
  }

  const handleBulkDelete = () => {
    dispatch({
      type: 'record/bulkDelete',
      payload: {
        recordidlist: rowSelectKeys,
        query: {Page: page}
      }
    })
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRow) => {
      if (selectedRowKeys.length === 0) {
        setShowBulkButton(false)
      } else {
        setRowSelectKeys(selectedRowKeys)
        if (!showBulkButton) setShowBulkButton(true)
      }
    }
  }

  const handleOpenBox = openBoxModel => {
    dispatch({
      type: 'record/openBox',
      payload: {
        openBoxModel,
        query: {Page: page}
      }
    })
  }

  const columns = [
    {
      
      title: 'personName',
      dataIndex: 'personname',
      key: 'personname'
    },
    {
      title: 'personNumber',
      dataIndex: 'personnumber',
      key: 'personnumber'
    },
    {
      title: 'cabinetName',
      dataIndex: 'cabinetname',
      key: 'cabinetname'
    },
    {
      title: 'cabinetNumber',
      dataIndex: 'cabinetnumber',
      key: 'cabinetnunmber'
    },
    {
      title: 'cabinetType',
      dataIndex: 'cabinettype',
      key: 'cabinettype'
    },
    {
      title: 'boxNumber',
      dataIndex: 'boxnumber',
      key: 'boxnumber'
    },
    {
      title: 'startedtime',
      dataIndex: 'startedtime',
      key: 'startedtime'
    },
    {
      title: 'endtime',
      dataIndex: 'endtime',
      key: 'endtime'
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => {
        return (
          <div>
            <RecordModel title='Update Record' handleOk={handleUpdate} record={record}>
              <Button>Update</Button>
            </RecordModel>
          </div>
        )
      }
    }
  ]
  return (
    <div className={styles.normal}>
      <div className={styles.create}>
        {showBulkButton? <Button type="danger" onClick={handleBulkDelete}>Delete</Button>: null}
        <OpenBoxModal handleOpenBox={handleOpenBox}>
          <Button type="default">Open</Button>
        </OpenBoxModal>
        <RecordCreateModal handleCreate={handleCreate} >
          <Button type="primary">Create</Button>
        </RecordCreateModal>
      </div>
      <div>
        <Table dataSource={list} rowKey={record => record.id} columns={columns} rowSelection={rowSelection} />
      </div>
    </div>
  );
}

const OpenBoxComponent = ({handleOpenBox, form, children}) => {
  const [visible, setVisible] = useState(false)
  const {getFieldDecorator} = form
  const handleOk = () => {
    form.validateFields((err, values) => {
      if (!err) {
        handleOpenBox(values)
        setVisible(false)
      }
    })
  }
  return (
    <span>
      <span onClick={() => setVisible(true)}>{children}</span>
      <Modal
        title="Open Box"
        visible={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
      >
        <Form>
          <Form.Item label="CabinetNumber">
            {getFieldDecorator('cabinetnumber', {
              rules: [
                {
                  required: true,
                  type: 'string'
                }
              ]
            })(<Input placeholder="CabinetNumber" />)}
          </Form.Item>
          <Form.Item label="PersonNubmer">
            {getFieldDecorator('personnumber', {
              rules: [
                {
                  required: true,
                  type: 'string'
                }
              ]
            })(<Input placeholder="PersonNumber" />)}
          </Form.Item>
          <Form.Item label="Action">
            {getFieldDecorator('action', {
              rules: [
                {
                  required: true,
                },
              ]
            })(<InputNumber min={0} />)}
          </Form.Item>
        </Form>
      </Modal>
    </span>
  )
}

const OpenBoxModal = Form.create({name: 'open_box_moal'})(OpenBoxComponent)

const RecordCreateComponent = ({handleCreate, form, children}) => {
  const [visible, setVisible] = useState(false)
  const handleClickOk = () => {
    form.validateFields((err, values) => {
      if (!err) {
        handleCreate(values)
        setVisible(false)
      }
    })
  }
  const {getFieldDecorator} = form
  return (
    <span>
      <span onClick={() => setVisible(true)}>{children}</span>
      <Modal
        title="Add a new Record"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleClickOk}
      >
        <Form>
          <Form.Item label="personNumber">
            {getFieldDecorator('personnumber', {
              rules: [
                {
                  required: true
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="boxId">
            {getFieldDecorator('boxid', {
              rules: [
                {
                  required: true
                }
              ]
            })(<Input />)}
          </Form.Item>
        </Form>
      </Modal>
    </span>
  )
}

const RecordCreateModal = Form.create({name: 'record_create_modal'})(RecordCreateComponent)

const mapStateToProps = state => {
  const {list, page, type} = state.record
  return {
    list,
    page,
    type
  }
}

export default connect(mapStateToProps)(Records)