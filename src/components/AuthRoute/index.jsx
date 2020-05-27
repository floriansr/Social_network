import React from 'react'

import { Route } from "react-router-dom";
import { useDispatch } from "react-redux"
import Cookies from 'js-cookie'
import { setConnexion } from "../../redux";


const AuthRoute = ({ component: Component, ...rest } : AuthRoute) => {

	const dispatch = useDispatch();

	const checkAuth = () => (

		Cookies.get('token') ? dispatch(setConnexion()) : false
	);

	return (
		<>
			<Route {...rest} render={props => ( checkAuth() ? ( <Component {...props} />) : ( <p>Welcome on My Social Network. This website is a training to Redux and React. We use auth and routing to create a small social media website.</p>))} />
		</>
	);
}

export default AuthRoute