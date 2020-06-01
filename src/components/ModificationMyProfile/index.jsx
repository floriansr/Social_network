import React from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Form, Input, Button } from 'antd';
import Cookies from 'js-cookie'


import { modificateProfile } from "../../redux";


const ModificationMyProfile  = () => {
	const dispatch = useDispatch();
  const myId = useSelector(state => state.user.data.id);
  const token = Cookies.get('token')


  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

	const changeValue = ({username, description}) => {

    const data = {
      username,
      description,
    }

      fetch(`https://api-minireseausocial.mathis-dyk.fr/users/${myId}`, {
        method: 'put',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(response => {
          console.log(response)
          dispatch(modificateProfile(username, description))
        })
        .catch(error => console.log(error)); 
	}

	const onFinish = values => {
    console.log(' Success:', values);
    changeValue(values)
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

	return (
		<>
			<Form
		      {...layout}
		      name="basic"
		      initialValues={{
		        remember: true,
		      }}
		      onFinish={onFinish}
		      onFinishFailed={onFinishFailed}
		    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>


       <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: 'Please input your description!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Modificate
        </Button>
      </Form.Item>
    </Form>
		</>
		)

}
export default ModificationMyProfile