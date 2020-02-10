import React, { useState } from 'react'
import { Form, Modal, Input } from 'antd'

const UserModelComponent = ({user, title, onCreate, form, children}) => {
    const [visible, setVisible] = useState(false)
    // const {name, email, website} = user
    const {getFieldDecorator} = form
    const handleOk = () => {
        form.validateFields((err, values) => {
            if (!err) {
                onCreate(values)
                setVisible(false)
            }
        })
    }
    return (
        <span>
            <span onClick={() => setVisible(true)}>{children}</span>
            <Modal
                visible={visible}
                title={title}
                onCancel={() => setVisible(false)}
                onOk={handleOk}
                >
                <Form layout="vertical">
                    <Form.Item label="Name">
                        {getFieldDecorator('name', {
                            initialValue: user.name,
                            rules: [
                                {
                                    required: true,
                                    message: 'name cannot be empty!!!'
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Email">
                        {getFieldDecorator('email', {
                            initialValue: user.email
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Website">
                        {getFieldDecorator('website', {
                            initialValue: user.website
                        })(<Input />)}
                    </Form.Item>
                </Form>
            </Modal>
        </span>
    )
}

export const UserModel = Form.create({name: 'update_modal'})(UserModelComponent)
    
