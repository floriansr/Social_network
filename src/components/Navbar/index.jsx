import React from "react";

import { Link, useHistory } from "react-router-dom";
import Cookies from 'js-cookie'


const Navbar = () => {
	const history = useHistory();

	const deleteCookies = () => {
		Cookies.remove('token')
		history.push("/");
	};

	return (
		<>
			<div>
				<Link to="/">Home</Link>
				<Link to="/register">Register</Link>
			</div>
			<button type="button" onClick={deleteCookies}>Deconnexion</button>
		</>
	);
};

export default Navbar;
