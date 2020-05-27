import React from "react";

import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"

import Cookies from 'js-cookie'
import { removeConnexion } from "../../redux";



const Navbar = () => {
	const history = useHistory();
	const logStatus = useSelector(state => state.log.log);
	const dispatch = useDispatch();


	const deleteCookies = () => {
		Cookies.remove('token')
		dispatch(removeConnexion())
		history.push("/");
	};

	return (
		<>
			<div>
				<Link to="/">Home</Link>
				{ logStatus ? 
					<div>
							<button type="button" onClick={deleteCookies}>Deconnexion</button>
							<Link to="/profile">Profile</Link>
					</div>
					 : 
					 <div>
					 	<Link to="/register">Register</Link>
					 	<Link to="/login">Login</Link>
					 </div>
				}
			</div>
		</>
	);
};

export default Navbar;