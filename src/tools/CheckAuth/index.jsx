import React from "react"
import { useSelector, useDispatch } from "react-redux"

import { setConnexion } from "../../redux";


const CheckAuth = () => {
	const logii = useSelector(state => state.log);
	const dispatch = useDispatch();
	dispatch(setConnexion())



	return (
	<>
	    <p>{logii}</p>

	</>
	);
};

export default CheckAuth