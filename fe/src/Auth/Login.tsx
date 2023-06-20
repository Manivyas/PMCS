import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import useHttpClient from '../hooks/useHttpClient';

export const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login } = useHttpClient();

  const validateUser = () => {
    login(form)
      .then(res => {
        if (res?.data?.isLoggedIn) {
          localStorage.setItem('isLoggedIn', JSON.stringify(res?.data?.isLoggedIn));
          navigate('/home');
        }
        else {
          alert('Invalid User');
        }
      })
      .catch(err => {
        // console.log(err);
      })
  }

  const onFinish = (values: any) => {
    localStorage.setItem('username', values.username);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, marginTop: '20%', marginLeft: '30%' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input onChange={(e) => {
            const username = e.target.value;
            form.setFieldsValue({ name: username });
          }} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password onChange={(e) => {
            const password = e.target.value;
            form.setFieldsValue({ password: password });
          }} />
        </Form.Item>

        {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={validateUser}>
            Submit
          </Button>
        </Form.Item>
      <div style={{ marginLeft: '30%' }}>
        Already have an account?
        <a href='/signup' style={{ marginLeft: '5px',textDecoration:'none' }}>Signup</a>
      </div>
      </Form>
    </div>
  )
}
