import React from 'react'
import { Form, Input, Icon, Button } from 'antd'
import 'antd/dist/antd.css';

const LoginFormComponent = ({handleLogin, form}) => {
    const {getFieldDecorator} = form
    const handleSubmit = e => {
        e.preventDefault()
        form.validateFields((err, values) => {
            if (!err) {
                handleLogin(values)
            }
        })
    }
    return (
        <Form onSubmit={handleSubmit} className="login-form" 
        // style={{maxWidth: '300px',}}
        >
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    )
}

export const LoginForm = Form.create({name: 'login_form'})(LoginFormComponent)