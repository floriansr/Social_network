import React, { useEffect } from 'react'

import { useSelector, useDispatch } from "react-redux"
import { Route } from "react-router-dom";	

import Cookies from 'js-cookie'
import shortid from 'shortid'
import { Card } from 'antd';

import { setConnexion, removeConnexion, setPosts, setProfile } from "../../redux";


const AuthRoute = ({ component: Component, ...rest } : AuthRoute) => {
	const token = Cookies.get('token');
	const dispatch = useDispatch();
	const logStatus = useSelector(state => state.log.log);
	const allPosts = useSelector(state => state.posts.posts);


	// GET PROFILE WITH TOKEN

		useEffect(() => { 

		    fetch('https://api-minireseausocial.mathis-dyk.fr/users/me', {
		      method: 'get',
		      headers: {
		        'Authorization': `Bearer ${token}`, 
		        'Content-Type': 'application/json'
		      },
		    })
		      .then(response => response.json())
		      .then(response => {
		        dispatch(setProfile(response))
		      })
		      .catch(error => console.log(error)); 
		}, [dispatch, token]);

	// GET POSTS WITHOUT TOKEN

		useEffect(() => { 

		    fetch("https://api-minireseausocial.mathis-dyk.fr/posts?_limit=1000&_sort=created_at:desc", {
		        method: 'get',
		        headers: {
		          'Content-Type': 'application/json'
		        },
		      })
		        .then(response => response.json())
		        .then(response => {
		          dispatch(setPosts(response))
		        })
		        .catch(error => console.log(error)); 
		}, [dispatch]);


	const checkLog = () => (
		Cookies.get('token') ? dispatch(setConnexion()) : dispatch(removeConnexion())
	);

	return (
		<>
			<Route {...rest} render={props => ( (checkLog() && logStatus) ? ( <Component {...props} />) : 
				( 
				<div>
					<p>Welcome on My Social Network. This website is a training to Redux and React. We use auth and routing to create a small social media website.</p>
			
					{ allPosts.map((x) => (
						<div className="site-card-border-less-wrapper" key={shortid.generate()}>

						    <Card bordered={false} style={{ width: 300 }}>
						       <p>{x.text}</p>
						    </Card>
						</div>
					))}	
				</div>
				)
			)} />
		</>
	);
}

export default AuthRoute