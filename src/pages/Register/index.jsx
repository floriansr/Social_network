import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux"

import { Form, Input, Button } from 'antd';
import Cookies from 'js-cookie'

import { setConnexion } from "../../redux";



	const layout = {
	  labelCol: {
	    span: 4,
	  },
	  wrapperCol: {
	    span: 16,
	  },
	};
	const tailLayout = {
	  wrapperCol: {
	    offset: 4,
	    span: 16,
	  },
	};


const Register = () => {
	const history = useHistory();
  const dispatch = useDispatch();



    const getProfile = () => {

    const token = Cookies.get('token')

    fetch('https://api-minireseausocial.mathis-dyk.fr/users/me', {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(response => {
      	console.log(response);
        dispatch(setConnexion())
      	history.push("/");
      })
      .catch(error => console.log(error));
  }



	const Inscription = ({username, email, password}) => {

		const data = {
			username,
			email,
			password
		}

		console.log(data)

	        fetch('https://api-minireseausocial.mathis-dyk.fr/auth/local/register', {
	          method: 'post',
	          headers: {
	            'Content-Type': 'application/json'
	          },
	         body: JSON.stringify(data)
	        })
	      .then(response => response.json())
	      .then(response => {
	              console.log(response)
	              const token = response.jwt
	              Cookies.set('token', token, { expires: 7 })
	              getProfile()
	            })
	      .catch(error => console.log(error));
  }


    const onFinish = values => {
    console.log('Success:', values);
    Inscription(values)
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
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>


      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
		</>
	);
};

export default Register;
