import React from "react";
import { Link, useHistory } from "react-router-dom";


import { Form, Input, Button, Card } from 'antd';
import Loader from "react-loader";

import { useSelector } from "react-redux"
import Cookies from 'js-cookie'
import shortid from "shortid";

// import { increment, decrement } from "../../redux";



const Home = () => {
	const history = useHistory();
	// const dispatch = useDispatch();
	const myId = useSelector(state => state.user.data.id);
	const allPosts = useSelector(state => state.posts.posts);
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

	const refresh = () => {
		history.push("/");
	}

  
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

	const deletePost = (postId) => {


	      fetch(`https://api-minireseausocial.mathis-dyk.fr/posts/${postId}`, {
	        method: 'delete',
	        headers: {
	          'Authorization': `Bearer ${token}`, 
	          'Content-Type': 'application/json'
	        },
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


	if (allPosts.length === 0) {
		return (
			<Loader />
		)
	}

	const increment = (post) => {

		const data = {
	      like: post.like + 1
	    }

	    fetch(`https://api-minireseausocial.mathis-dyk.fr/posts/${post.id}`, {
	      method: 'put',
	      headers: {
	        'Content-Type': 'application/json',
	        'Authorization': `Bearer ${token}`
	      },
	      body: JSON.stringify(data)
	    })
	}

	const decrement = (post) => {
		const data = {
	      like: post.like - 1
	    }

	    fetch(`https://api-minireseausocial.mathis-dyk.fr/posts/${post.id}`, {
	      method: 'put',
	      headers: {
	        'Content-Type': 'application/json',
	        'Authorization': `Bearer ${token}`
	      },
	      body: JSON.stringify(data)
	    })
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
		        <Button type="primary" htmlType="submit" onClick={refresh}>
		          Submit
		        </Button>
		      </Form.Item>
		    </Form>


		{ allPosts.map((x) => (


			<div className="site-card-border-less-wrapper" key={shortid.generate()}>

			    <Card title={(x.user === null ? "noname" : <Link to={`/user/${x.user.username}`}>{x.user.username}</Link>)} bordered={false} style={{ width: 300 }}>
			       <p>{x.text}</p>
				   {(x.user !== null && x.user.id === myId ? <button type="button" onClick={() => deletePost(x.id)}>Delete me</button> : "")}
			       {(x.like === null ? 0 : x.like)}
			       <button type="button" onClick={() => increment(x)}>+</button>
			       <button type="button" onClick={() => decrement(x)}>-</button>
			    </Card>
			</div>

		))}
		</>
	);
};

export default Home;

