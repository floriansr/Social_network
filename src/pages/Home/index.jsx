import React, { useEffect } from "react";

import { Form, Input, Button, Card } from 'antd';
import Loader from "react-loader";

import { useSelector, useDispatch } from "react-redux"
import Cookies from 'js-cookie'
import shortid from "shortid";

import { setPosts } from "../../redux";


const Home = () => {
	const myId = useSelector(state => state.user.data.id);
	const dispatch = useDispatch();
	const token = Cookies.get('token')

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


  useEffect(() => {

      fetch("https://api-minireseausocial.mathis-dyk.fr/posts", {
        method: 'get',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json'
        },
      })
        .then(response => response.json())
        .then(response => {
          console.log(response)
          dispatch(setPosts(response))
        })
        .catch(error => console.log(error));       
    }, [dispatch, token]);





	const createPost = ({text}) => {

		    const data = {
		      text,
		      user: myId
		    }


	      fetch("https://api-minireseausocial.mathis-dyk.fr/posts", {
	        method: 'post',
	        headers: {
	          'Authorization': `Bearer ${token}`, 
	          'Content-Type': 'application/json'
	        },
	        body: JSON.stringify(data)
	      })
	        .then(response => response.json())
	        .then(response => {
	          console.log(response)
	        })
	        .catch(error => console.log(error)); 
	}

	const onFinish = values => {
	    console.log('Success:', values);
	    createPost(values)
	};

	const onFinishFailed = errorInfo => {
	    console.log('Failed:', errorInfo);
	};

	const allPosts = useSelector(state => state.posts.posts);


	if (allPosts.length === 0) {
		return (
			<Loader />
		)
	}

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
		        label="New post"
		        name="text"
		        rules={[
		          {
		            required: true,
		            message: 'Please say something!',
		          },
		        ]}
		      >
		        <Input />
		      </Form.Item>

		      <Form.Item {...tailLayout}>
		        <Button type="primary" htmlType="submit">
		          Submit
		        </Button>
		      </Form.Item>
		    </Form>

		  <div className="site-card-border-less-wrapper">


		{ allPosts.map((x) => (

			  <div key={shortid.generate()}>
			    <Card title={(x.user === null ? "noname" : x.user.username)} bordered={false} style={{ width: 300 }}>
			       <p>{x.text}</p>
			    </Card>
			  </div>
		))}

		  </div>

		</>
	);
};

export default Home;


		    // <Card title={{if (xuserusername = null) return "az"}} bordered={false} style={{ width: 300 }} key={shortid.generate()}>
		    //   <p>{x.text}</p>
		    // </Card>

		// {allPosts.map((x) => (
		// 	console.log("x")
		// 	))}
