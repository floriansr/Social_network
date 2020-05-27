import React from "react"
import { useSelector, useDispatch } from "react-redux"

import { setConnexion } from "../../redux";


const CheckAuth = () => {
	const logii = useSelector(state => state.log);

	console.log(logii)

	const dispatch = useDispatch();

	dispatch(setConnexion())

	console.log(logii)



	return (
	<>
	    <p>{logii}</p>

	</>
	);
};

export default CheckAuth