import { Card, Form, Modal } from 'antd'
import 'antd/dist/antd.css'
import { useState } from 'react'

const UserDetailComponent = ({dispatch, showDetail, userId, user, children }) => {
  const [visible, setVisible] = useState(false)

  const FormItems = Object.entries(user).map(([key, value]) => {
    return (
      <Form.Item key={key} label={key}>
        {user[key]}
      </Form.Item>
    )
  })

  const show = () => {
    showDetail(userId)
    setVisible(true)
  }
  return (
    <div>
      <span onClick={() => show()}>{children}</span>
      <Modal
        title="User Detail"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
      >
        <Form title="User Detail1">
          {FormItems}
        </Form>
      </Modal>
    </div>
  )
}

export const UserDetailForm = Form.create({ name: 'user_detail_form' })(UserDetailComponent)
