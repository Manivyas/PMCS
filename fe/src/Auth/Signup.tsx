import React from 'react';
import { Button, Form, Input } from 'antd';
import useHttpClient from '../hooks/useHttpClient';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const {signup} = useHttpClient();

    const onFinish = (values: any) => {
        // console.log('Success:', values);
        form.resetFields();
      };
      
      const onFinishFailed = (errorInfo: any) => {
        // console.log('Failed:', errorInfo);
      };
      
      const submitHandler = ()=>{
        signup(form)
        .then(res=>{
            // console.log(res.data);
            navigate('/login');
          })
          .catch(err=>{
            // console.log(err);
          });
      }

      const navigateToLogin =()=>{
        navigate('/login');
      }

    return (
        <div> 
    <Form
    form={form}
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600,marginTop:'20%',marginLeft:'30%'}}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="name"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input onChange={(e)=>{
        const username = e.target.value;
        form.setFieldsValue({ name: username });
      }}/>
    </Form.Item>

    <Form.Item
      label="Email Id"
      name="email"
      rules={[{ required: true, message: 'Please input your email!' }]}
    >
      <Input onChange={(e)=>{
        const email = e.target.value;
        form.setFieldsValue({ email: email });
      }}/>
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password onChange={(e)=>{
        const password = e.target.value;
        form.setFieldsValue({ password: password });
      }}/>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit"  onClick={submitHandler}>
        Submit
      </Button>
    </Form.Item>
    <div style={{marginLeft:'30%'}}>
    Already have an account?
    <a href='/login' style={{marginLeft:'5px'}}>Login</a>
    </div>
  </Form>
  </div>
    )
}