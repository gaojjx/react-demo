import React, { useState } from 'react'
import { Form, Modal, Input } from 'antd'

const RecordComponent = ({record, title, handleOk, form, children}) => {
    const [visible, setVisible] = useState(false)
    const {getFieldDecorator} = form
    const clickOk = () => {
        form.validateFields((err, values) => {
            handleOk(values)
            setVisible(false)
        })
    }
    return (
        <div>
            <span onClick={() => setVisible(true)}>{children}</span>
            <Modal
                title={title}
                onOk={clickOk}
                visible={visible}
                onCancel={() => setVisible(false)}
            >
                <Form layout="vertical">
                    <Form.Item label="recordId">
                        {getFieldDecorator('id', {
                            initialValue: record.id,
                            rules: [
                                {
                                    required: true
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export const RecordModel = Form.create({name: 'record_model'})(RecordComponent)