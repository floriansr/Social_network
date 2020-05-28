import React, { useEffect } from 'react'
import { Route } from "react-router-dom";
// import Loader from "react-loader";

import Cookies from 'js-cookie'
import { useSelector, useDispatch } from "react-redux"
import { setConnexion, removeConnexion, setPosts, setProfile } from "../../redux";


const AuthRoute = ({ component: Component, ...rest } : AuthRoute) => {
	const dispatch = useDispatch();
	const token = Cookies.get('token')
	const logStatus = useSelector(state => state.log.log);
	// const checkProfileId = allPosts.find((x) => x.user.username === userSlug)


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

		    fetch("https://api-minireseausocial.mathis-dyk.fr/posts?_limit=100000&_sort=created_at:desc", {
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
			<Route {...rest} render={props => ( (checkLog() && logStatus) ? ( <Component {...props} />) : ( <p>Welcome on My Social Network. This website is a training to Redux and React. We use auth and routing to create a small social media website.</p>))} />
		</>
	);
}

export default AuthRoute