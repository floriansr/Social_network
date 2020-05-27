import React from 'react'
import { Route } from "react-router-dom";

import Cookies from 'js-cookie'
import { useSelector, useDispatch } from "react-redux"
import { setConnexion, removeConnexion } from "../../redux";


const AuthRoute = ({ component: Component, ...rest } : AuthRoute) => {

	const dispatch = useDispatch();
	const logStatus = useSelector(state => state.log.log);

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