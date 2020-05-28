import React from 'react';
import { useDispatch } from "react-redux"
import { Form, Input, Button } from 'antd';

import { modificateProfile } from "../../redux";


const ModificationMyProfile  = () => {
	const dispatch = useDispatch();

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
    dispatch(modificateProfile(username, description))
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