import React from "react";

import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux"

import Cookies from 'js-cookie'


const Navbar = () => {
	const history = useHistory();
	const logStatus = useSelector(state => state.log);

	const deleteCookies = () => {
		Cookies.remove('token')
		history.push("/");
	};

	return (
		<>
			<div>
				<Link to="/">Home</Link>
				{ logStatus ? <button type="button" onClick={deleteCookies}>Deconnexion</button> : <div><Link to="/register">Register</Link><Link to="/login">Login</Link></div> }
			</div>
		</>
	);
};

export default Navbar;